export function formatMoneyNumberToString(value?: number | string) {
  try {
    if (value === undefined) return "";

    const newValue = value.toString();
    if (newValue.includes(".")) return newValue;

    return `${newValue}.00`;
  } catch (error) {
    return "";
  }
}

export function formatPhone(phone?: string) {
  try {
    if (!phone) return "";
    phone = removePhoneMask(phone);

    // +55 (99) 99999-9999
    if (phone.length === 13)
      return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 9)}-${phone.slice(9)}`;

    // +55 (99) 9999-9999
    if (phone.length === 12)
      return `+${phone.slice(0, 2)} (${phone.slice(2, 4)}) ${phone.slice(4, 8)}-${phone.slice(8)}`;

    // (99) 99999-9999
    if (phone.length === 11) return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;

    // (99) 9999-9999
    if (phone.length === 10) return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;

    return phone;
  } catch {
    return phone || "";
  }
}

export function removePhoneMask(phone?: string) {
  try {
    if (!phone) return "";

    return phone.replace(/\D/g, "");
  } catch {
    return phone || "";
  }
}

export function formatFileName(aq_arquivo = ""): string {
  try {
    return aq_arquivo.split("arquivo/")[1].split("?X-Amz")[0];
  } catch {
    return aq_arquivo;
  }
}

export function addMoneyMask(value?: number) {
  if (value === undefined) value = 0;

  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function removeMoneyMask(value?: string) {
  if (value === undefined) return "00.00";

  return value.replace(/\./g, "").replace(",", ".").replace("R$ ", "");
}

export function removeMoneyMaskAndConvert(value?: string) {
  return parseFloat(removeMoneyMask(value));
}

export function formatCPF(value?: string) {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function removeCPFMask(value: string) {
  return value.replace(/\./g, "").replace(/-/g, "");
}

export function formatCPFToLGPD(value?: string) {
  try {
    if (!value) return "";
    return `***.${formatCPF(value).slice(4, 11)}-**`;
  } catch {
    return value;
  }
}

export function removeCNPJMask(value: string) {
  return value.replace(/\./g, "").replace(/-/g, "").replace(/\//g, "");
}

export function formatLocality(ob_cidade?: any) {
  if (!ob_cidade?.nm_cidade || !ob_cidade.ds_uf) return "";
  return `${ob_cidade.nm_cidade} / ${ob_cidade.ds_uf}`;
}

export function formatLocalityLong(ob_cidade?: any) {
  if (!ob_cidade?.nm_cidade || !ob_cidade.cd_estado?.nm_estado) return "";
  return `${ob_cidade.nm_cidade} / ${ob_cidade.cd_estado?.nm_estado}`;
}

export function formatZipCode(zipCode: string) {
  return zipCode
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function removeFormatZipCode(zipCode: string) {
  return zipCode.replaceAll(".", "").replaceAll("-", "");
}

export function formatGender(value?: "M" | "F" | null) {
  return !value ? "Outro" : value.toLowerCase() === "m" ? "Masculino" : "Feminino";
}

export function formatCreditCard(value?: string) {
  return value?.replace(/[^0-9]/, "") || "";
}
