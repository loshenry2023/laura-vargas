import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getCalendar } from "../redux/actions";
import Loader from "./Loader";
import DonutChart from "./DonutChart";

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
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  const [fetchDataBalance, setFetchDataBalance] = useState({
    branchName: workingBranch.branchName,
    dateFrom: formattedDate,
    dateTo: formattedDate,
    token,
  });

  useEffect(() => {
    dispatch(getBalance(fetchDataBalance)).then(setLoading(false));
  }, [fetchDataBalance]);

  const handleDate = (e) => {
    if (testData.test(e.target.value) && e.target.value.split("-")[0] >= 2024) {
      setFetchDataBalance({
        ...fetchDataBalance,
        [e.target.name]: e.target.value,
      });
    }
  };

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

      return updatedValue.length === 0
        ? updatedData
        : { ...prevData, [e.target.name]: updatedValue };
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
    balanceData.rows.forEach((user) => {
      user.payments.forEach((payment) => {
        const existingPayment = paymentMethods.find(
          (item) => item[payment.Method]
        );
        if (existingPayment) {
          existingPayment[payment.Method] += payment.Amount;
        } else {
          const newPayment = { [payment.Method]: payment.Amount };
          paymentMethods.push(newPayment);
        }
      });
    });
  }

  let comision = 0;
  if (fetchDataBalance.idUser) {
    const copy = specialists;
    const specialistData = copy.filter(
      (specialist) => specialist.id === fetchDataBalance.idUser[0]
    );
    comision = Number(specialistData[0].comission);
  }

  const [chartDataSpecialists, setChartDataSpecialists] = useState([
    { name: "Total" }, //, value: totalIncomes
    ...specialists,
  ]);

  const [chartDataServicesCount, setChartDataServicesCount] = useState([
    { name: "Total" }, //, value: totalIncomes
    ...services,
  ]);

  const [chartDataPaymentMethods, setChartDataPaymentMethods] = useState([
    { name: "Total" }, //, value: totalIncomes
    ...paymentMethods,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getBalance(fetchDataBalance));
        console.log("Balance Data:", response);
        setLoading(false);

        // Procesar datos
        let totalIncomes = 0;
        let specialistCounts = [];
        let serviceCounts = [];

        if (response.payload && response.payload.rows) {
          response.payload.rows.forEach((user, index) => {
            // Calcular total de ingresos
            user.payments.forEach((payment) => {
              totalIncomes += payment.Amount;
            });

            // Datos para el gráfico de especialistas
            specialistCounts.push({
              id: `specialist-${index}`, // Asegúrate de que `id` sea único
              name: `${user.name} ${user.lastName}`,
              value: user.services.length,
            });

            // Datos para el gráfico de cantidad de veces que se realizó cada servicio
            services.forEach((service, serviceIndex) => {
              const serviceCount = user.services.filter(
                (userService) => userService.serviceName === service.serviceName
              ).length;
              const existingService = serviceCounts.find(
                (item) => item.id === `service-${serviceIndex}`
              );

              if (existingService) {
                existingService.value += serviceCount;
              } else {
                serviceCounts.push({
                  id: `service-${serviceIndex}`, // Asegúrate de que `id` sea único
                  name: service.serviceName,
                  value: serviceCount,
                });
              }
            });
          });
        }

        console.log("Ingresos totales:", totalIncomes);
        console.log("Métodos de pago:", paymentMethods);

        // Actualizar gráficos
        // Datos para el gráfico de especialista
        setChartDataSpecialists([
          // { name: "Cantidad de Servicios por Especialista" },
          ...specialistCounts,
        ]);
        // Datos para el gráfico de procedimientos
        setChartDataServicesCount([
          // {
          //   name: "Cantidad de Veces que se Realizó cada Servicio",
          // },
          ...serviceCounts,
        ]);

        console.log("paymethods para grafico paymentmethods", paymentMethods);
        console.log("paymethods para grafico paymethods", payMethods);

        // Datos para el gráfico de métodos de pago
        // Crear un conjunto con todos los nombres de métodos de pago
        const allPaymentMethodsSet = new Set(
          payMethods.map((payMethod) => payMethod.paymentMethodName)
        );

        // Crear un array con todos los métodos de pago con un valor inicial de 0
        const allPaymentMethods = Array.from(allPaymentMethodsSet).map(
          (methodName) => ({
            name: methodName,
            value: 0,
          })
        );

        // Obtener los ingresos reales por método de pago
        const paymentMethodIncomes = payMethods.map((payMethod) => {
          const methodName = payMethod.paymentMethodName;
          const methodData = paymentMethods.find(
            (item) => item[methodName]
          ) || { [methodName]: 0 };
          return { name: methodName, value: methodData[methodName] };
        });

        // Combinar ambos arrays para obtener el resultado final
        const finalPaymentMethods = allPaymentMethods.map((allMethod) => {
          const realMethod = paymentMethodIncomes.find(
            (realMethod) => realMethod.name === allMethod.name
          );
          return realMethod || allMethod;
        });

        setChartDataPaymentMethods([
          // { name: "Estadísticas por Métodos de Pago" },
          ...finalPaymentMethods,
        ]);

        console.log("Ingresos por Métodos de Pago:", paymentMethodIncomes);
      } catch (error) {
        console.error("Error fetching balance data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, fetchDataBalance, specialists, services, payMethods]);

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
                {specialists.map((especialist, index) => (
                  <option name="idUser" key={index} value={especialist.id}>
                    {especialist.name} {especialist.lastName}
                  </option>
                ))}
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
                {services.map((service, index) => (
                  <option key={index} value={service.id}>
                    {service.serviceName}
                  </option>
                ))}
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
                {payMethods.map((payMethod, index) => (
                  <option key={index} value={payMethod.id}>
                    {payMethod.paymentMethodName}
                  </option>
                ))}
              </select>
            </div>
          </section>
          <div className="grid grid-cols-3 gap-4">
            {/* Columna izquierda */}
            <div className="col-span-1">
              <section className="flex flex-col gap-4">
                <div className="h-40 w-60 p-5 flex flex-row justify-center items-center rounded-2xl shadow-md shadow-black transition duration-700 dark:bg-darkPrimary hover:bg-blue-500 dark:hover:bg-zinc-800">
                  <h1 className="text-2xl dark:text-darkText">
                    Total ingresos: <span> {totalIncomes}$</span>
                  </h1>
                </div>
                <div className="h-40 w-60 p-5 flex flex-row justify-center items-center rounded-2xl shadow-md shadow-black transition duration-700 dark:bg-darkPrimary hover:bg-blue-500 dark:hover:bg-zinc-800">
                  <h1 className="text-center text-2xl dark:text-darkText">
                    {comision
                      ? `Comision: ${comision}%`
                      : "Seleccione especialista para visualizar comisión"}{" "}
                  </h1>
                </div>
              </section>
            </div>

            {/* Columna central */}
            <div className="col-span-2 grid grid-cols-1 gap-4">
              {/* Métodos de pago ocupa 2 columnas */}
              <DonutChart
                data={chartDataPaymentMethods}
                title="Métodos de pago"
                className="col-span-2"
              />

              {/* Fila para Turnos por especialista y Cantidad de servicios realizados */}
              <div className="flex gap-4">
                {/* Turnos por especialista ocupa 1 columna */}
                <DonutChart
                  data={chartDataSpecialists}
                  title="Turnos por especialista"
                />
                {/* Cantidad de servicios ocupa 1 columna */}
                <DonutChart
                  data={chartDataServicesCount}
                  title="Cantidad de servicios realizados"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Balance;
