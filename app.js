const ticketSection = document.getElementById("ticket-section");

/**
 * Scroll to the ticket section
 */
const scrollToTicketSection = () => {
   ticketSection.scrollIntoView({ behavior: "smooth", block: "start" });
};
