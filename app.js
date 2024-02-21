const PASSENGER_CAPACITY = 40;
const TICKET_PRICE = 550;
const SEAT_CODES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COUPON_CODES = {
   NEW15: 0.15,
   "Couple 20": 0.2,
};

let selectedSeats = [];
let cost = 0;
let grandTotal = 0;

const ticketSection = document.getElementById("ticket-section");
const navigationMenu = document.getElementById("nav-menu");
const seats = document.getElementById("seats");
const checkoutTable = document.getElementById("checkout-table");
const seatCounter = document.getElementById("seat-counter");
const seatLeft = document.getElementById("seat-left");
const totalPrice = document.getElementById("total-price");
const grandPrice = document.getElementById("grand-total");
const coupon = document.getElementById("coupon");
const appliedCode = document.getElementById("applied-code");
const phoneInput = document.getElementById("phone");
const modal = document.getElementById("success-modal");

/**
 * Scroll to the ticket section
 */
const scrollToTicketSection = () => {
   ticketSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Toggles (show/hide) navigation menu
 */
const toggleNavigationMenu = () => {
   navigationMenu.classList.toggle("hidden");
};

/**
 * Creates a element.
 * @param {string} tagName
 * @param {string?} className
 * @param {string?} content
 * @returns {HTMLElement}
 */
const createElement = (tagName, className, content) => {
   const element = document.createElement(tagName);
   if (className) element.className = className;
   if (content) element.innerHTML = content;
   return element;
};

/**
 * Adds a record to the checkout table for given `seatNumber`.
 * @param {string} seatNumber
 */
const addSeatRecord = (seatNumber) => {
   let record = createElement("div", "grid grid-cols-3");
   record.append(
      createElement("span", null, seatNumber),
      createElement("span", null, "Economoy"),
      createElement("span", "text-right", "550")
   );
   checkoutTable.appendChild(record);
};

/**
 * Creates a seat.
 * @param {string} seatNumber
 */
const createSeat = (seatNumber) => {
   const seat = createElement(
      "button",
      "rounded-lg lg:rounded-xl bg-lightgray flex items-center justify-center",
      seatNumber
   );
   seat.addEventListener("click", () => {
      let domModified = false;
      if (selectedSeats.includes(seatNumber)) {
         selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
         seat.classList.remove("!bg-emerald-500");
         seat.classList.remove("!text-white");
         coupon.firstElementChild.style.display = "block";
         coupon.lastElementChild.style.display = "none";
         domModified = true;
      } else if (selectedSeats.length < 4) {
         selectedSeats.push(seatNumber);
         seat.classList.add("!bg-emerald-500");
         seat.classList.add("!text-white");
         domModified = true;
      } else {
         alert("You can select maximum 4 seats");
      }

      if (domModified) {
         const len = selectedSeats.length;
         checkoutTable.innerHTML = "";
         selectedSeats.forEach((seat) => addSeatRecord(seat));
         seatCounter.innerText = len;
         cost = len * TICKET_PRICE;
         totalPrice.innerText = cost;
         grandPrice.innerText = cost;
         seatLeft.innerText = PASSENGER_CAPACITY - len;
      }
   });
   seats.appendChild(seat);
};

/**
 * Generate seats
 */
SEAT_CODES.forEach((code) => {
   seats.appendChild(
      createElement("span", "flex justify-end items-center", code)
   );
   createSeat(`${code}1`);
   createSeat(`${code}2`);
   seats.appendChild(createElement("span"));
   createSeat(`${code}3`);
   createSeat(`${code}4`);
});

/**
 * Applies the coupon if valid, alerts otherwise.
 */
const applyCoupon = () => {
   if (selectedSeats.length < 4) return;

   const code = document.getElementById("coupon-code").value;
   let discount = COUPON_CODES[code];

   if (discount) {
      grandTotal = cost * (1 - discount);
      grandPrice.innerText = grandTotal;
      appliedCode.innerText = code;
      coupon.firstElementChild.style.display = "none";
      coupon.lastElementChild.style.display = "block";
   } else {
      alert("Wrong coupon code");
   }
};

/**
 * Allow only numbers as contact number
 * @param {InputEvent} event
 */
const validateContactNumber = () => {
   phoneInput.value = phoneInput.value.replace(/\D/g, "");
};

/**
 * Submit form
 */
const submit = () => {
   const contactNumber = document.getElementById("phone").value.trim();
   if (contactNumber !== "" && selectedSeats.length > 0) {
      modal.classList.add("!visible");
      modal.children[0].classList.add("!scale-100");
   }
};
