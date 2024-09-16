import { PanicJumbo } from "../components/PanicJumbo";
import { PanicButton } from "../components/PanicButton";
import { updateHead } from "../utils/PanicHead";
import { PanicCard } from "../components/PanicCard";

export function home() {
  updateHead(
    "PanicMode - Home",
    "PanicMode: Where junior devs turn chaos into code. Embrace the panic, master the syntax!",
    "/nouveau-favicon.svg"
  );

  const jumbo = new PanicJumbo(
    "Welcome to panicMode",
    "h1",
    "p",
    "This is the content of the jumbo  (omg this is working!)",
    "Click Me",
    "a",
    "primary",
    "Jumbo Title",
    "/about",
    () => alert("Jumbo clicked!")
  );

  const primaryButton = new PanicButton(
    "Primary Button",
    "button",
    "primary",
    "Primary Button Title",
    undefined,
    () => alert("Primary Button clicked!")
  );
  const secondaryButton = new PanicButton(
    "Secondary Button",
    "button",
    "secondary",
    "Secondary Button Title",
    undefined,
    () => alert("Secondary Button clicked!")
  );
  const ternaryButton = new PanicButton(
    "Ternary Button",
    "button",
    "ternary",
    "Ternary Button Title",
    undefined,
    () => alert("Ternary Button clicked!")
  );

  const card = new PanicCard(
    "Card Title",
    "This is the content of the card.",
    "https://images.pexels.com/photos/3193846/pexels-photo-3193846.jpeg?auto=compress&cs=tinysrgb&w=800",
    "Image description",
    "Click Me",
    "/blog",
    "primary"
  );

  document.body.appendChild(jumbo.render());
  document.body.appendChild(primaryButton.render());
  document.body.appendChild(secondaryButton.render());
  document.body.appendChild(ternaryButton.render());
  document.body.appendChild(card.render());
}
