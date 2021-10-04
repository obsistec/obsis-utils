import { LocalityCity } from "@/store/locality/types";

export function addUTC(date?: string) {
  try {
    if (!date) return "";
    if (typeof date !== "string" || date.length > 10) return date;

    return date.replaceAll("-", "/");
  } catch (error) {
    return "";
  }
}

export function formatDate(date?: string) {
  try {
    if (!date) return "";

    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(addUTC(date)));
  } catch {
    return "";
  }
}

export function addDateMask(date?: string) {
  if (!date) return "";
  const maskedDate = date.replace(/\D/g, "");

  if (maskedDate?.length < 3) return maskedDate;
  if (maskedDate?.length < 5) return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2, 4)}`;
  return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2, 4)}/${maskedDate.slice(4)}`;
}

export function removeDateMask(date?: string) {
  if (!date) return "";
  date = date.replace(/\D/g, "");

  if (date?.length === 4) return `${date.slice(0, 4)}-`;
  if (date?.length === 6) return `${date.slice(0, 4)}-${date.slice(4, 6)}-`;

  return date;
}

export function addDateMMAAAAMask(date?: string) {
  if (!date) return "";
  const maskedDate = date.replace(/\D/g, "");

  if (maskedDate?.length < 3) return maskedDate;
  return `${maskedDate.slice(0, 2)}/${maskedDate.slice(2)}`;
}

export function removeDateMMAAAAMask(date?: string) {
  if (!date) return "";
  date = date.replace(/\D/g, "");

  if (date?.length === 4) return `${date.slice(0, 4)}-`;
  return date;
}

export function formatDateMMAAAA(date?: string) {
  try {
    if (!date) return "";
    if (date.length === 4) date = `20${date.slice(2)}-${date.slice(0, 2)}`;

    return Intl.DateTimeFormat("pt-BR", {
      month: "2-digit",
      year: "numeric",
    }).format(new Date(addUTC(date)));
  } catch {
    return "";
  }
}
export function formatDateMMAAAAEn(date?: string) {
  try {
    if (!date) return "";
    date = formatDateEn(date);

    return date.slice(0, 7);
  } catch {
    return "";
  }
}

export function addHoursMask(hours: string) {
  hours = hours.replaceAll(/\D/g, "");

  let hour = hours.slice(0, 2);
  let minute = hours.slice(2, 4);

  if (Number(hour[0]) > 2) hour = `2${hour[1] || ""}`;
  if (Number(hour) > 23) hour = "23";

  if (Number(minute[0]) > 5) minute = `5${minute[1] || ""}`;
  if (Number(minute) > 59) minute = "59";

  if (hours.length > 2) return `${hour}:${minute}`;

  return hour;
}

export function formatHours(hours?: string) {
  try {
    if (!hours) return "";

    const hour = Number(hours.slice(0, 2));
    const min = Number(hours.slice(3, 5));

    return Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    }).format(new Date().setHours(hour, min));
  } catch (error) {
    return "";
  }
}

export function removeHoursOfDate(date?: string | Date) {
  try {
    if (!date) return "";
    if (typeof date === "object") date = date.toISOString();

    return date.split("T")[0] || "";
  } catch (error) {
    return "";
  }
}

export function formatDateTime(date?: string, hour?: string) {
  try {
    if (date?.includes("T")) {
      try {
        const [newDate, newHour] = date.split("T");
        date = newDate;
        hour = newHour.substring(0, 5);
      } catch {
        hour = "";
      }
    }

    if (!date) return "";
    if (!hour) return formatDate(date);

    return Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(`${addUTC(date)} ${hour}`));
  } catch (error) {
    return "";
  }
}

export function formatDateEn(date: any): string {
  try {
    if (typeof date.toString === "function") date = date.toString();
    if ((typeof date !== "string" && !date.includes("/")) || String(date).length > 14) date = formatDate(date);
    if (date.includes("/")) return date.split("/").reverse().join("-");

    return `${date.slice(4, 8)}-${date.slice(2, 4)}-${date.slice(0, 2)}`;
  } catch (error) {
    return "";
  }
}

export function formatDateTimeEn(date: any, hour?: "current" | string) {
  try {
    if (hour === "current") hour = `${new Date().getHours()}:${new Date().getMinutes()}`;
    return `${formatDateEn(date)} ${hour}`;
  } catch (error) {
    return "";
  }
}

export function formatDateLong(date?: string) {
  try {
    if (!date) return "";
    if (date.includes("/")) date = formatDateEn(date);

    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(addUTC(date)));

    return formattedDate;
  } catch (error) {
    return "";
  }
}

export function formatFullDateLong(date?: string) {
  try {
    if (!date) return "";
    if (date.includes("/")) date = formatDateEn(date);

    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(addUTC(date)));

    return formattedDate;
  } catch (error) {
    return "";
  }
}

export function formatNumericDateLong(date?: string) {
  try {
    if (!date) return "";

    const formattedDate = Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(new Date(addUTC(date)));

    return formattedDate;
  } catch (error) {
    return "";
  }
}

export function formatDateTimeLong(date?: string, hour?: string) {
  try {
    if (date?.includes("T")) {
      try {
        const [newDate, newHour] = date.split("T");
        date = newDate;
        hour = newHour.substring(0, 5);
      } catch {
        hour = "";
      }
    }

    if (date && !hour) return formatDateLong(date);
    if (!date) return "";

    return Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(new Date(`${addUTC(date)} ${hour}`));
  } catch (error) {
    return "";
  }
}

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

export function getHourInDate(date?: string) {
  try {
    let hour = "";
    hour = date?.split("T")[1].substring(0, 5) || "";

    return hour;
  } catch {
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

export function formatCNPJ(value?: string) {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
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

export function formatLocality(ob_cidade?: LocalityCity) {
  if (!ob_cidade?.nm_cidade || !ob_cidade.ds_uf) return "";
  return `${ob_cidade.nm_cidade} / ${ob_cidade.ds_uf}`;
}

export function formatLocalityLong(ob_cidade?: LocalityCity) {
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
