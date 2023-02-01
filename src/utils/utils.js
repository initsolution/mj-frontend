import moment from "moment";

export const formatPrice = (value) => {
  if (!Number(value)) {
    return "0";
  } else {
    const val = (Number(value) / 1).toFixed(0).replace(".", ",");
    return " " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export const formatDate = (value, type) => {
  if (type === "short") {
    return moment(value).locale("id").format("DD-MM-YY");
  } else if (type === "short-date") {
    return moment(value).locale("id").format("DD-MM-YYYY");
  } else if (type === "short-dateTime") {
    return moment(value).locale("id").format("DD-MM-YYYY HH:mm");
  } else if (type === "medium") {
    return moment(value).locale("id").format("DD MMM YYYY");
  } else if (type === "long") {
    return moment(value).locale("id").format("DD MMMM YYYY");
  } else if (type === "complete") {
    return moment(value).locale("id").format("dddd, DD MMMM YYYY");
  } else if (type === "dateTime") {
    return moment(value).locale("id").format("YYYY-MM-DD HH:mm:ss");
  } else if (type === "dateTimeShort") {
    return moment(value).locale("id").format("YYYY-MM-DD HH:mm");
  } else if (type === "input") {
    return moment(value).locale("id").format("YYYY-MM-DD");
  } else if (type === "timeShort") {
    return moment(value).locale("id").format("HH:mm");
  } else if (type === "slash") {
    return moment(value).locale("id").format("DD/MM/YY");
  } else if (type === "M/D/YYYY") {
    return moment(value).locale("id").format("M/D/YYYY");
  } else if (type === "start_at") {
    return moment(value).locale("id").format("YYYY-MM-DD 00:00:00");
  } else if (type === "end_at") {
    return moment(value).locale("id").format("YYYY-MM-DD 23:59:59");
  } else if (type === "year") {
    return moment(value).locale("id").format("YYYY");
  } else {
    return moment(value).locale("id");
  }
};

export const manipulateDate = (tgl, operator, val) =>{
  var newdate
  if(operator === 'add'){
    newdate = moment(tgl, "YYYY-MM-DD").add(val, 'days');
    
  }else if(operator === 'minus'){
    newdate = moment(tgl, "YYYY-MM-DD").add((val*-1), 'days')
  }
  return newdate.format('YYYY-MM-DD')
  
}
