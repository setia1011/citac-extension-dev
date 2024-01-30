import moment from "moment";


const toDate = (str) => {
   return moment(str).format('DD/MM/YYYY');
}

const toIdDate = (date) => {
   const year = date?.toLocaleString("id-ID", { year: "numeric" });
   const month = date?.toLocaleString("id-ID", { month: "2-digit" });
   const day = date?.toLocaleString("id-ID", { day: "2-digit" });
   const formattedDate = day + "/" + month + "/" + year;
   return formattedDate;
}

const toDbDate = (date) => {
   const year = date?.toLocaleString("id-ID", { year: "numeric" });
   const month = date?.toLocaleString("id-ID", { month: "2-digit" });
   const day = date?.toLocaleString("id-ID", { day: "2-digit" });
   const formattedDate = year + "-" + month + "-" + day;
   return formattedDate;
}

export {
   toDate,
   toIdDate,
   toDbDate
}