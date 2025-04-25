const conveniosDatabase = window.conveniosDatabase;

// Function to render all articles
function renderArticlesADM(filteredConvenios = null) {
  const articlesContainerAdm = document.querySelector(".grid.grid-cols-4");
  if (articlesContainerAdm) {
    const conveniosToRender = filteredConvenios || conveniosDatabase;
    articlesContainerAdm.innerHTML = conveniosToRender
      .map(createArticleHTMLAdm)
      .join("");
  }
}

// Function to create article HTML
function createArticleHTMLAdm(convenio) {
  return `
    <article class="border! border-zinc-300! w-[280px] h-fit rounded-xl shadow-xl space-y-2 relative">
      <button 
        class="text-zinc-400 hover:text-red-600 transition-colors duration-300 focus:outline-none! cursor-pointer font-semibold absolute top-2 right-3"
        data-toggle="modal"
        data-target=".modal-delete"
        data-convenio-id="${convenio.id}"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <div class="w-full h-9/12 flex items-center justify-center bg-azul">
        <img src="${convenio.logo}" alt="${convenio.nome}" class="size-40 object-contain" />
      </div>
      <div class="w-full h-3/12 p-3 border-t border-zinc-300 rounded-b-xl space-y-2!">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-zinc-900">${convenio.nome}</p>
        </div>
        <button
          class="bg-cyan-800 text-white w-full py-2 px-4 transition-colors duration-300 hover:bg-cyan-700! rounded-xl! focus:outline-none! cursor-pointer font-semibold"
          data-toggle="modal"
          data-target=".modal-data"
          data-convenio-id="${convenio.id}"
        >
          Consultar
        </button>
        <button
          class="bg-white border-[1.5px] border-zinc-400 text-zinc-500 w-full py-2 px-4 transition-colors duration-300 hover:bg-zinc-200! rounded-xl! focus:outline-none! cursor-pointer gap-1"
          data-toggle="modal"
          data-target=".modal-edit"
          data-convenio-id="${convenio.id}"
        >
          Editar
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </article>
  `;
}

// Function to handle modal content
function handleModalDelete() {
  const modalButtons = document.querySelectorAll("[data-convenio-id]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const convenioId = parseInt(button.getAttribute("data-convenio-id"));
      const convenio = conveniosDatabase.find((c) => c.id === convenioId);
      if (convenio) {
        const modalContent = document.querySelector(
          ".modal-delete .modal-content"
        );
        if (modalContent) {
          modalContent.innerHTML = createModalDelete(convenio);
        }
      }
    });
  });
}

// Function to create modal content
function createModalDelete(convenio) {
  return `
    <div class="modal-header px-6! py-2!">
      <div class="flex w-full items-center justify-between">
        <h2 class="text-lg! font-semibold">Gostaria de excluir o convênio</h2>
        <button
          type="button"
          class="close text-2xl! text-zinc-500! hover:text-red-500! transition-colors duration-300 cursor-pointer focus:outline-none!"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="modal-body px-6! py-2 flex flex-col gap-3!">
      <p class="text-zinc-700 w-full">
        Quer mesmo cancelar? Caso cancele ele não aparecerá mais na lista de convênios para os recepcionistas e você!
      </p>
      <div class="flex items-center justify-end gap-2">
        <button 
          type="button"
          class="bg-red-600 text-white px-4 py-2 rounded-md! cursor-pointer hover:bg-red-500 transition-all duration-300">
          Excluir
        </button>
        <button
          type="button"
          class="text-zinc-600 border border-zinc-600 hover:bg-zinc-200! duration-300 cursor-pointer transition-all px-4 py-2 rounded-md!"
          data-dismiss="modal"
          aria-label="Close"
        >
          cancelar
        </button>
      </div>
    </div>
  `;
}

// Function to handle modal content
function handleModalData() {
  const modalButtons = document.querySelectorAll("[data-convenio-id]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const convenioId = parseInt(button.getAttribute("data-convenio-id"));
      const convenio = conveniosDatabase.find((c) => c.id === convenioId);
      if (convenio) {
        const modalContent = document.querySelector(
          ".modal-data .modal-content"
        );
        if (modalContent) {
          modalContent.innerHTML = createModalData(convenio);
        }
      }
    });
  });
}

// Function to create modal content
function createModalData(convenio) {
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

// Check if we're on the admin page before executing the code
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("adm.html")) {
    renderArticlesADM();
    handleModalDelete();
    handleModalData();
  }
});
