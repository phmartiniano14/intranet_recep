const conveniosDatabase = window.conveniosDatabase;

// Function to render all articles
function renderArticles(filteredConvenios = null) {
  const articlesContainer = document.querySelector(".grid.grid-cols-4");
  if (articlesContainer) {
    const conveniosToRender = filteredConvenios || conveniosDatabase;
    articlesContainer.innerHTML = conveniosToRender
      .map(createArticleHTML)
      .join("");
  }
}

// Function to create article HTML
function createArticleHTML(convenio) {
  return `
    <article class="border! border-zinc-300! w-[280px] h-fit rounded-xl shadow-xl">
      <div class="w-full h-9/12 flex items-center justify-center bg-azul">
        <img src="${convenio.logo}" alt="${convenio.nome}" class="size-40 object-contain" />
      </div>
      <div class="w-full h-3/12 p-3 border-t border-zinc-300 rounded-b-xl space-y-2!">
        <p class="font-semibold">${convenio.nome}</p>
        <button
          class="bg-cyan-800 text-white w-full py-2 px-4 transition-colors duration-300 hover:bg-cyan-700! rounded-xl! focus:outline-none! cursor-pointer font-semibold"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
          data-convenio-id="${convenio.id}"
        >
          Consultar
        </button>
      </div>
    </article>
  `;
}

// Function to handle modal content
function handleModalContent() {
  const modalButtons = document.querySelectorAll("[data-convenio-id]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const convenioId = parseInt(button.getAttribute("data-convenio-id"));
      const convenio = conveniosDatabase.find((c) => c.id === convenioId);
      if (convenio) {
        const modalContent = document.querySelector(".modal-content");
        if (modalContent) {
          modalContent.innerHTML = createModalContent(convenio);
        }
      }
    });
  });
}

// Function to create modal content
function createModalContent(convenio) {
  return `
    <div class="modal-header px-4! py-2!">
      <img src="${convenio.logo}" alt="" style="width: 80px" />
      <button
        type="button"
        class="close text-2xl! text-zinc-500! hover:text-red-500! transition-colors duration-300 cursor-pointer focus:outline-none!"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body px-10! flex flex-col! gap-4!">
      <div class="flex flex-col!">
        <div class="relative">
          <span class="w-1 h-4 rounded-xl bg-fuchsia-900 absolute -left-2 top-1.5"></span>
          <p class="font-semibold text-xl m-0!">Tipos de atendimento</p>
        </div>
        <p class="text-zinc-700 text-sm">${convenio.tiposAtendimento}</p>
      </div>

      <div class="flex flex-col!">
        <div class="relative">
          <span class="w-1 h-4 rounded-xl bg-fuchsia-900 absolute -left-2 top-1.5"></span>
          <p class="font-semibold text-xl m-0!">Tipos de planos</p>
        </div>
        <p class="text-zinc-700 text-sm">${convenio.tiposPlanos}</p>
      </div>

      <div class="flex flex-col!">
        <div class="relative">
          <span class="w-1 h-4 rounded-xl bg-fuchsia-900 absolute -left-2 top-1.5"></span>
          <p class="font-semibold text-xl m-0!">Exames bloqueados</p>
        </div>
        <p class="text-zinc-700 text-sm">${convenio.examesBloqueados}</p>
      </div>

      <div class="flex flex-col!">
        <div class="relative">
          <span class="w-1 h-4 rounded-xl bg-fuchsia-900 absolute -left-2 top-1.5"></span>
          <p class="font-semibold text-xl m-0!">Tipos de internação</p>
        </div>
        <p class="text-zinc-700 text-sm">${convenio.tiposInternacao}</p>
      </div>
     
      <span class="w-full h-[1px] bg-zinc-300"></span>

      <div class="grid grid-cols-2!">
        <div class="flex flex-col! gap-4!">
          <div class="flex flex-col! gap-1!">
            <div class="relative">
              <span class="w-1 h-4 rounded-xl bg-fuchsia-400 absolute -left-2 top-1.5"></span>
              <p class="font-semibold text-xl m-0!">Login</p>
            </div>
            <p class="text-zinc-700 text-sm"><span class="font-semibold">Usuário: </span> ${
              convenio.login.usuario
            }</p>
            <p class="text-zinc-700 text-sm"><span class="font-semibold">Senha: </span> ${
              convenio.login.senha
            }</p>
          </div>

          <div class="flex flex-col! gap-1!">
            <div class="relative">
              <span class="w-1 h-4 rounded-xl bg-fuchsia-400 absolute -left-2 top-1.5"></span>
              <p class="font-semibold text-xl m-0!">Email</p>
            </div>
            ${convenio.emails
              .map(
                (email, index) => `
              <p class="text-zinc-700 text-sm"><span class="font-semibold">Email ${
                index + 1
              }: </span> ${email}</p>
            `
              )
              .join("")}
          </div>

          <div class="flex flex-col! gap-1!">
            <div class="relative">
              <span class="w-1 h-4 rounded-xl bg-fuchsia-400 absolute -left-2 top-1.5"></span>
              <p class="font-semibold text-xl m-0!">Telefone</p>
            </div>
            ${convenio.telefones
              .map(
                (telefone, index) => `
              <p class="text-zinc-700 text-sm"><span class="font-semibold">Tel ${
                index + 1
              }: </span> ${telefone}</p>
            `
              )
              .join("")}
          </div>
        </div>
        
        <div class="flex flex-col! gap-4 w-full">
          <div class="flex flex-col! w-full gap-2!">
            <div class="relative">
              <span class="w-1 h-4 rounded-xl bg-cyan-600 absolute -left-2 top-1.5"></span>
              <p class="font-semibold text-xl m-0!">Site do convênio</p>
            </div>
            <div class="flex! flex-wrap! w-full! gap-3!">
              ${convenio.sites
                .map(
                  (site) => `
                <a href="${site.url}" class="py-1 px-4 bg-cyan-800! hover:bg-cyan-700! transition-colors duration-300 rounded-lg text-white flex intems-center justify-center font-semibold text-sm">
                  <p>${site.nome}</p>
                </a>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="flex flex-col! w-full gap-2!">
            <div class="relative">
              <span class="w-1 h-4 rounded-xl bg-cyan-600 absolute -left-2 top-1.5"></span>
              <p class="font-semibold text-xl m-0!">Manual de abertura</p>
            </div>
            <div class="flex! flex-wrap! w-full! gap-3!">
              <a href="#" class="py-2 px-7 bg-cyan-800! hover:bg-cyan-700! transition-colors duration-300 rounded-lg text-white flex intems-center justify-center font-semibold text-sm">
                <p>Baixe agora <i class="fa-solid fa-download"></i></p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <span class="w-full h-[1px] bg-zinc-300"></span>

      <div class="flex flex-col! gap-1!">
        <div class="relative">
          <span class="w-1 h-4 rounded-xl bg-cyan-400 absolute -left-2 top-1.5"></span>
          <p class="font-semibold text-xl m-0!">Observações</p>
        </div>
        <p class="text-zinc-700">${convenio.observacoes}</p>
      </div>
    </div>
  `;
}

// Function to handle search
function handleSearch() {
  const searchInput = document.getElementById("searchConvenios");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredConvenios = conveniosDatabase.filter((convenio) =>
        convenio.nome.toLowerCase().includes(searchTerm)
      );
      renderArticles(filteredConvenios);
      handleModalContent(); // Reattach modal handlers to new elements
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderArticles();
  handleModalContent();
  handleSearch();
});
