// Função para validar JSON
function isValidJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

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
