export function detectCardType(number: string) {
  const re: { [key: string]: any } = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const key in re) {
    if (re[key].test(number)) {
      return key;
    }
  }
}

export function compareDates(date: string) {
  const today = new Date();
  const dateOBJ = new Date(date.includes("T") ? date : date.replaceAll("-", "/"));

  return new Date(dateOBJ.setDate(dateOBJ.getDate() + 1)) >= today ? true : false;
}

export function getUserName(firstName?: string, lastName?: string, full = true) {
  const name = String(`${firstName} ${lastName}`.trim());

  if (name === "undefined") return "";
  if (!full && name?.length > 16) return name.split(" ")[0];

  return name;
}

export function splitUserName(userName: string) {
  const userNameSlices = userName.split(" ");

  const firstName = userNameSlices.slice(0, userNameSlices.length > 2 ? 2 : 1).join(" ");
  const lastName = userNameSlices.slice(userNameSlices.length > 2 ? 2 : 1).join(" ");

  return [firstName || "", lastName || ""];
}
