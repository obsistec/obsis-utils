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

export function removeHoursOfDate(date?: string | Date) {
  try {
    if (!date) return "";
    if (typeof date === "object") date = date.toISOString();

    return date.split("T")[0] || "";
  } catch (error) {
    return "";
  }
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
    if (date.length == 4) date = `20${date.slice(2)}-${date.slice(0, 2)}`;

    return Intl.DateTimeFormat("pt-BR", {
      month: "2-digit",
      year: "numeric",
    }).format(new Date(addUTC(date)));
  } catch {
    return "";
  }
}

export function formatDateMMAA(date?: string) {
  try {
    if (!date) return "";
    if (date.length == 4) date = `20${date.slice(2)}-${date.slice(0, 2)}`;

    return Intl.DateTimeFormat("pt-BR", {
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(addUTC(date)));
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

export function getHourInDate(date?: string) {
  try {
    let hour = "";
    hour = date?.split("T")[1].substring(0, 5) || "";

    return hour;
  } catch {
    return "";
  }
}
