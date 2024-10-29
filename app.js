const API_URL = "https://jsonstorage.net/api/items";
let storageId = "";  // Armazena o ID do JSON criado, inicializado como uma string vazia

// Função para salvar os dados JSON
async function saveData() {
  const dataInput = document.getElementById("data").value;

  // Validar se o conteúdo é um JSON válido
  if (!isValidJson(dataInput)) {
    document.getElementById("result").innerText = "Erro: Dados de entrada não são um JSON válido!";
    return;
  }

  try {
    const response = await fetch(storageId ? `${API_URL}/${storageId}` : API_URL, {
      method: storageId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: dataInput
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao salvar dados: ${errorText}`);
    }

    const result = await response.json();

    // Se for um POST inicial, armazenamos o ID
    if (!storageId) {
      storageId = result.uri.split("/").pop();
    }

    document.getElementById("result").innerText = "Dados salvos com sucesso!";
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = `Erro ao salvar dados: ${error.message}`;
  }
}

// Função para recuperar os dados JSON
async function retrieveData() {
  if (!storageId) {
    document.getElementById("result").innerText = "Nenhum dado salvo ainda!";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${storageId}`, {
      method: "GET"
    });

    if (!response.ok) throw new Error("Erro ao recuperar dados");

    const result = await response.json();
    document.getElementById("result").innerText = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "Erro ao recuperar dados!";
  }
}

// Função para validar JSON
function isValidJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}
