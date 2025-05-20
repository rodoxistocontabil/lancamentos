document.getElementById("form-cadastro").addEventListener("submit", async function(e) {
  e.preventDefault();

  const razao_social = document.getElementById("razao_social").value;
  const cnpj = document.getElementById("cnpj").value;
  const uf = document.getElementById("uf").value;
  const unidade = document.getElementById("unidade").value;
  const codigo_sistema = document.getElementById("codigo_sistema").value;

  const { data, error } = await supabase
    .from('empresas')
    .insert([
      {
        razao_social,
        cnpj,
        uf,
        unidade,
        codigo_sistema
      }
    ]);

  if (error) {
    alert("Erro ao salvar empresa: " + error.message);
  } else {
    alert("Empresa cadastrada!");
    carregarEmpresas();
  }
});

async function carregarEmpresas() {
  const { data, error } = await supabase.from('empresas').select();

  if (!error && data) {
    const lista = document.getElementById("empresas-lista");
    lista.innerHTML = "";
    data.forEach(emp => {
      const li = document.createElement("li");
      li.textContent = `${emp.razao_social} (${emp.cnpj})`;
      lista.appendChild(li);
    });
  }
}

// Carrega empresas ao iniciar
carregarEmpresas();
