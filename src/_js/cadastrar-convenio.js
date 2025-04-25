document.addEventListener("DOMContentLoaded", () => {
  // Função para criar uma tag
  function createTag(text, containerId) {
    const tag = document.createElement("div");
    tag.className =
      "px-3 py-1 bg-fuchsia-100 text-fuchsia-900 rounded-lg flex items-center gap-2";
    tag.innerHTML = `
      <span>${text}</span>
      <button type="button" class="text-fuchsia-700 hover:text-fuchsia-900">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    tag.querySelector("button").addEventListener("click", () => {
      tag.remove();
    });

    document.getElementById(containerId).appendChild(tag);
  }

  // Função para lidar com upload de arquivo
  function handleFileUpload(inputId, fileNameId) {
    const input = document.getElementById(inputId);
    const fileNameSpan = document.getElementById(fileNameId);

    input.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        fileNameSpan.textContent = e.target.files[0].name;
        fileNameSpan.classList.remove("text-zinc-400");
        fileNameSpan.classList.add("text-zinc-900");
      } else {
        fileNameSpan.textContent =
          inputId === "logoConvenio" ? "Anexar imagem" : "Anexar manual";
        fileNameSpan.classList.remove("text-zinc-900");
        fileNameSpan.classList.add("text-zinc-400");
      }
    });
  }

  // Configurar handlers para uploads de arquivo
  handleFileUpload("logoConvenio", "logoFileName");
  handleFileUpload("manualAbertura", "manualFileName");

  // Handlers para adicionar tags
  document
    .getElementById("addTipoAtendimento")
    .addEventListener("click", () => {
      const select = document.getElementById("tiposAtendimento");
      const value = select.value;
      if (value) {
        createTag(value, "tiposAtendimentoTags");
        select.value = "";
      }
    });

  document.getElementById("addTipoPlano").addEventListener("click", () => {
    const input = document.getElementById("tipoPlano");
    const value = input.value.trim();
    if (value) {
      createTag(value, "tiposPlanosTags");
      input.value = "";
    }
  });

  document.getElementById("addTipoInternacao").addEventListener("click", () => {
    const select = document.getElementById("tiposInternacao");
    const value = select.value;
    if (value) {
      createTag(value, "tiposInternacaoTags");
      select.value = "";
    }
  });

  document.getElementById("addExameBloqueado").addEventListener("click", () => {
    const input = document.getElementById("examesBloqueados");
    const value = input.value.trim();
    if (value) {
      createTag(value, "examesBloqueadosTags");
      input.value = "";
    }
  });

  document.getElementById("addEmail").addEventListener("click", () => {
    const input = document.getElementById("email");
    const value = input.value.trim();
    if (value && value.includes("@")) {
      createTag(value, "emailsTags");
      input.value = "";
    }
  });

  document.getElementById("addTelefone").addEventListener("click", () => {
    const input = document.getElementById("telefone");
    const value = input.value.trim();
    if (value) {
      createTag(value, "telefonesTags");
      input.value = "";
    }
  });

  document.getElementById("addSite").addEventListener("click", () => {
    const input = document.getElementById("linkSite");
    const value = input.value.trim();
    if (value && value.startsWith("http")) {
      createTag(value, "sitesTags");
      input.value = "";
    }
  });

  // Handler para o botão cancelar
  document.getElementById("cancelarBtn").addEventListener("click", () => {
    window.location.href = "adm.html";
  });

  // Handler para submissão do formulário
  document
    .getElementById("convenioForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Coletar todos os dados do formulário
      const formData = {
        nome: document.getElementById("nomeConvenio").value,
        logo: document.getElementById("logoConvenio").files[0],
        tiposAtendimento: Array.from(
          document.getElementById("tiposAtendimentoTags").children
        ).map((tag) => tag.querySelector("span").textContent),
        tiposPlanos: Array.from(
          document.getElementById("tiposPlanosTags").children
        ).map((tag) => tag.querySelector("span").textContent),
        tiposInternacao: Array.from(
          document.getElementById("tiposInternacaoTags").children
        ).map((tag) => tag.querySelector("span").textContent),
        examesBloqueados: Array.from(
          document.getElementById("examesBloqueadosTags").children
        ).map((tag) => tag.querySelector("span").textContent),
        login: {
          usuario: document.getElementById("loginUsuario").value,
          senha: document.getElementById("loginSenha").value,
        },
        emails: Array.from(document.getElementById("emailsTags").children).map(
          (tag) => tag.querySelector("span").textContent
        ),
        telefones: Array.from(
          document.getElementById("telefonesTags").children
        ).map((tag) => tag.querySelector("span").textContent),
        sites: Array.from(document.getElementById("sitesTags").children)
          .map((tag) => tag.querySelector("span").textContent)
          .map((url) => ({
            nome: "Site",
            url: url,
          })),
        manualAbertura: document.getElementById("manualAbertura").files[0],
        observacoes: document.getElementById("observacoes").value,
      };

      // Aqui você pode adicionar a lógica para enviar os dados para o servidor
      console.log("Dados do formulário:", formData);

      // Redirecionar para a página de admin após o sucesso
      window.location.href = "adm.html";
    });
});
