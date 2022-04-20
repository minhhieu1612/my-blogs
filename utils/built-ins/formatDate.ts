const formatDate = (label: string | Date) =>
  new Date(label).toLocaleDateString("vi-VN", {
    year: "numeric",
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  export default formatDate;