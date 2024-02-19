const SEAT_CODES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let selectedSeats = [];
let cost = 0;
let grandTotal = 0;

const ticketSection = document.getElementById("ticket-section");
const seats = document.getElementById("seats");
const checkoutTable = document.getElementById("checkout-table");
const seatCounter = document.getElementById("seat-counter");
const totalPrice = document.getElementById("total-price");
const grandPrice = document.getElementById("grand-total");

/**
 * Scroll to the ticket section
 */
const scrollToTicketSection = () => {
   ticketSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
      "rounded-xl bg-lightgray flex items-center justify-center",
      seatNumber
   );
   seat.addEventListener("click", () => {
      let domModified = false;
      if (selectedSeats.includes(seatNumber)) {
         selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
         seat.classList.remove("!bg-emerald-500");
         seat.classList.remove("!text-white");
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
         checkoutTable.innerHTML = "";
         selectedSeats.forEach((seat) => addSeatRecord(seat));
         seatCounter.textContent = selectedSeats.length;
         cost = selectedSeats.length * 500;
         totalPrice.textContent = cost;
         grandPrice.textContent = cost;
      }
   });
   seats.appendChild(seat);
};

// Generate seats
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
