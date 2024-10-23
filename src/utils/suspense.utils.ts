
export const wrapPromise = (promise: Promise<any>) => {
  let status = "pending";
  let result: any;

  const suspender = promise
    .then((response) => {
      status = "fulfilled";
      result = response;
    })
    .catch((e) => {
      status = "rejected";
      result = e;
    });

  return {
    read() {
      if (status === "pending") throw suspender;
      else if (status === "rejected") throw result;
      else if (status === "fulfilled") return result;
    },
  };
};