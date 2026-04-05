// form_modal
const formBtns = document.querySelectorAll(".form_btn");
const formModal = document.querySelector(".form_modal");
const closeBtn = document.querySelector(".form_modal_close");

formBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formModal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  formModal.classList.remove("active");
});
// form_modal

// form
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputs = this.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "px solid #ccc";
      }
    });
  });
});
// form

const formTelBlocks = document.querySelectorAll(".form-tel");

const getCountries = async () => {
  try {
    const res = await fetch("/assets/scripts/countries.json");
    if (!res.ok) throw new Error("JSON yuklanmadi");
    return res.json();
  } catch (error) {
    console.error("Telefon kodlari JSON fayli yuklanmadi:", error);
    return [];
  }
};

if (formTelBlocks.length) {
  getCountries().then((countries) => {
    formTelBlocks.forEach((el) => {
      const btn = el.querySelector(".form-tel__btn");
      const telList = el.querySelector(".form-tel__list");
      const elInp = el.querySelector('input[type="tel"]');
      const elImg = el.querySelector(".form-tel__btn img");
      const elCode = el.querySelector(".form-tel__btn span");

      if (!btn || !telList || !elInp || !elImg || !elCode) return;

      btn.addEventListener("click", () => {
        el.classList.toggle("active");
      });

      const mask = IMask(elInp, {
        mask: "(000)000-000",
      });

      elInp.addEventListener("input", () => {
        elInp.classList.toggle("active", elInp.value.trim() !== "");
      });

      countries.forEach((data) => {
        const li = document.createElement("li");
        li.classList.add("form-tel__list-item");

        const span = document.createElement("span");
        const img = document.createElement("img");
        img.src = data.flag;
        const code = document.createElement("span");
        code.textContent = data.code;

        span.appendChild(img);
        span.appendChild(code);

        const name = document.createElement("div");
        name.textContent = data.name;

        li.appendChild(span);
        li.appendChild(name);
        telList.appendChild(li);

        li.addEventListener("click", () => {
          elCode.textContent = data.code;
          elImg.src = data.flag;
          elInp.placeholder = data.placeholder;
          elInp.classList.remove("active");
          mask.updateOptions({ mask: data.mask });
          mask.value = "";
          el.classList.remove("active");
        });
      });
    });
  });
}

window.addEventListener("click", (event) => {
  document.querySelectorAll(".form-tel.active").forEach((el) => {
    if (!el.contains(event.target)) {
      el.classList.remove("active");
    }
  });
});

// faq
document.querySelectorAll(".faq_header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;

    document.querySelectorAll(".faq_item").forEach((el) => {
      if (el !== item) el.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});
// faq
