const API_URL = "https://jsonstorage.net/api/items";
let storageId = "";  // Armazena o ID do JSON criado

// Função para salvar os dados JSON
async function saveData() {
  const dataInput = document.getElementById("data").value;
  
  try {
    const response = await fetch(storageId ? `${API_URL}/${storageId}` : API_URL, {
      method: storageId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: dataInput
    });

    if (!response.ok) throw new Error("Erro ao salvar dados");

    const result = await response.json();
    
    // Se for um POST inicial, armazenamos o ID
    if (!storageId) {
      storageId = result.uri.split("/").pop();
    }

    document.getElementById("result").innerText = "Dados salvos com sucesso!";
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = "Erro ao salvar dados!";
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
