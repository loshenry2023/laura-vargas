import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getCalendar } from "../redux/actions";
import Loader from "./Loader";

const Balance = ({ specialists, services, payMethods }) => {

  const testData = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.token);
  const workingBranch = useSelector((state) => state?.workingBranch);
  const balanceData = useSelector((state) => state?.balance);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


  const [fetchDataBalance, setFetchDataBalance] = useState({
    branchName: workingBranch.branchName,
    dateFrom: formattedDate,
    dateTo: formattedDate,
    token,
  })

  
  useEffect(() => {
    dispatch(getBalance(fetchDataBalance))
    .then(setLoading(false))
  }, [fetchDataBalance]);


  const handleDate = (e) => {
      if(testData.test(e.target.value) && e.target.value.split("-")[0] >= 2024){
        setFetchDataBalance(
        {
          ...fetchDataBalance,
          [e.target.name]: e.target.value
        }
      )} 
  }


  const handleDataToFetch = (e) => {
    setFetchDataBalance((prevData) => {
      const updatedValue =
        e.target.name === "idPayment" ||
        e.target.name === "idUser" ||
        e.target.name === "idService"
          ? e.target.value === ""
            ? []
            : [e.target.value]
          : e.target.value;
  
      const { [e.target.name]: removedProperty, ...updatedData } = {
        ...prevData,
        [e.target.name]: updatedValue,
      };
 
      return updatedValue.length === 0 ? updatedData : { ...prevData, [e.target.name]: updatedValue };
    });
  };

  //Total Incomes
  let totalIncomes = 0;
  if (balanceData && balanceData.rows) {
    balanceData.rows.forEach((user) => {
      user.payments.forEach((payment) => {
        totalIncomes += payment.Amount;
      });
    });
  }

  //PaymentMethos and incomes
  let paymentMethods = [];
  if (balanceData && balanceData.rows) {
    balanceData.rows.forEach(user => {
    user.payments.forEach(payment => {
      const existingPayment = paymentMethods.find(item => item[payment.Method]);
      if (existingPayment) {
        existingPayment[payment.Method] += payment.Amount;
      } else {
        const newPayment = { [payment.Method]: payment.Amount };
        paymentMethods.push(newPayment);
      }
    });
  })
}

let comision = 0
if(fetchDataBalance.idUser){
  const copy = specialists
  const specialistData = copy.filter(specialist => specialist.id === fetchDataBalance.idUser[0])
  comision = Number(specialistData[0].comission)
}

  return (
    <div className="flex flex-col mt-10 gap-5 w-2/3 mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl underline underline-offset-4 tracking-wide text-center font-fontTitle dark:text-beige sm:text-left">
            {" "}
            Balance{" "}
          </h1>
          <section className="flex md:flex-row gap-10">
            <div className="flex gap-2">
              <label className="hidden md:inline dark:text-darkText">
                Fecha inicial
              </label>
              <input
                type="date"
                name="dateFrom"
                defaultValue={formattedDate}
                onChange={handleDate}
                className="border rounded-md border-black px-2 text-sm dark:invert"
              />
            </div>
            <div className="flex gap-2">
              <label className="hidden md:inline dark:text-darkText">
                Fecha final
              </label>
              <input
                type="date"
                name="dateTo"
                defaultValue={formattedDate}
                onChange={handleDate}
                className="border rounded-md border-black px-2 text-sm  dark:invert"
              />
            </div>
          </section>
          <section className="flex flex-col gap-6 md:flex-row md:flex-wrap">
            <div className="flex gap-2">
              <label className="hidden md:inline dark:text-darkText">
                Especialista
              </label>
              <select
                type="text"
                className="border rounded-md border-black px-2 text-sm  dark:invert"
                onChange={(e) => handleDataToFetch(e)}
                name="idUser"
              >
                <option value=""> -- Especialista -- </option>
                {specialists.map((especialist, index) => 
                  <option name="idUser" key={index} value={especialist.id}>{especialist.name} {especialist.lastName}</option>
                  )}
              </select>
            </div>
            <div className="flex gap-2">
              <label className="hidden md:inline dark:text-darkText">
                Procedimientos
              </label>
              <select
                type="text"
                className="border rounded-md border-black px-2 text-sm  dark:invert"
                onChange={(e) => handleDataToFetch(e)}
                name="idService"
              >
                <option value=""> -- Procedimientos -- </option>
                {services.map((service, index) => 
                  <option key={index} value={service.id}>{service.serviceName}</option>
                  )}
              </select>
            </div>
            <div className="flex gap-2">
              <label className="hidden md:inline dark:text-darkText">
                Métodos de pago
              </label>
              <select
                type="text"
                className="border rounded-md border-black px-2 text-sm  dark:invert"
                onChange={(e) => handleDataToFetch(e)}
                name="idPayment"
              >
                <option value={[]}> -- Métodos de pago -- </option>
                {payMethods.map((payMethod, index) => 
                  <option key={index} value={payMethod.id}>{payMethod.paymentMethodName}</option>
                  )}
              </select>
            </div>
          </section>
          <section className="flex flex-col md:flex-row gap-10">
            <div className="h-40 w-60 p-5 flex flex-row justify-center items-center rounded-2xl shadow-md shadow-black transition duration-700 dark:bg-darkPrimary hover:bg-blue-500 dark:hover:bg-zinc-800">
              <h1 className="text-2xl dark:text-darkText">Total ingresos: <span> ${totalIncomes}</span></h1>
            </div>
            <div className="h-40 w-60 p-5 flex flex-row justify-center items-center rounded-2xl shadow-md shadow-black transition duration-700 dark:bg-darkPrimary hover:bg-blue-500 dark:hover:bg-zinc-800">
              <h1 className="text-center text-2xl dark:text-darkText"> {comision ? `Comision: ${comision}%` : "Seleccione especialista para visualizar comisión"} </h1>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Balance;
