import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../functions/calendar";
import cn from "../functions/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

//icons
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Calendar = () => {

	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

	const data = [{
		date_from: "2024-01-10T10:00:00.000Z",
		date_to: "2024-01-10T10:30:00.000Z",
		obs: "Persona mayor",
		current: false,
		User: {
			id: "12163541654165",
			userName: "dany@gmail.com",
			name: "Daniel",
			lastName: "Castañeda",
		},
		Branch: {
			id: "dasdasdsad",
			branchName: "Restrepo"
		},		
		Service:  {
			id: "1216354sadasdasdasd1654165",
			serviceName: "Micropigmentación",
			duration: 30,
			price: "0",
			ImageService: "asdasd",
		},
		Client:  {
			id: "1216354sadasdasdasd1654165",
			email: "Micropigmentación",
			name: "Tomas",
			lastName: "Bombau",
			id_pers: "456658",
			phoneNumber1: "1165939393",
			phoneNumber2: "1165939393",
			image: "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702302836/varpjl2p5dwvpwbmdiui.png",
		}},
		{
		date_from: "2024-01-10T11:00:00.000Z",
		date_to: "2024-01-10T11:10:00.000Z",
		obs: "Piel irritable",
		current: true,
		User: {
			id: "12163541654165",
			userName: "dany@gmail.com",
			name: "Jorgelino",
			lastName: "Perez",
		},
		Branch: {
			id: "21312312321",
			branchName: "Villavicencio"
		},	
		Service:  {
			id: "1216354sadasdasdasd1654165",
			serviceName: "Lifting",
			duration: 10,
			price: "1000",
			ImageService: "asdasd",
		},
		Client:  {
			id: "1216354sadasdasdasd1654165",
			email: "ramiro.alet@gmail.com",
			name: "Ramiro",
			lastName: "Alet",
			id_pers: "1125586",
			phoneNumber1: "034155568",
			phoneNumber2: "-",
			image: "https://res.cloudinary.com/doqyrz0sg/image/upload/v1702302836/varpjl2p5dwvpwbmdiui.png",
		}}]

  return (
		<div className="flex flex-col gap-10 justify-center mx-auto items-center sm:divide-x sm:w-1/2 xl:flex-row">
			<div className="w-96 h-full ">
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold dark:text-darkText">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center ">
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all dark:text-darkText"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all dark:text-darkText"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all dark:text-darkText"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1
										className={cn(
											currentMonth ? "" : "text-gray-400",
											today
												? "bg-red-600 text-white"
												: "",
											selectDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? "bg-black text-white dark:bg-darkText dark:text-black"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white dark:hover:bg-darkText dark:hover:text-black file:transition-all cursor-pointer select-none"
										)}
										onClick={() => {
											setSelectDate(date);
											console.log(date.$d)
										}}
									>
										{date.date()}
									</h1>
								</div>
							);
						}
					)}
				</div>
			</div>
			<div className="w-96 h-full sm:px-5 overflow-auto">
				<h1 className=" font-semibold dark:text-darkText">
					Agenda del {selectDate.toDate().toDateString()}
				</h1>
        <div className="flex flex-row gap-2">
				<button className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">06:00 a 10:00</button>
				<button className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">10:00 a 14:00</button>
				<button className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">14:00 a 19:00</button>
        </div>
		{data.map(cita => {
			return (
			<div className={cita.current === false ? "bg-green-200 border px-2 border-black mt-2 rounded-lg" : "bg-red-200 border px-2 border-black mt-2 rounded-lg"}>
				<div className="flex flex-col">
					<div className="flex flex-row justify-between">
					<h5 className="font-medium"> {cita.date_from.slice(11, 16)} - {cita.date_to.slice(11, 16)} <span> - {cita.Client.name} {cita.Client.lastName}</span></h5> 
					<div className="flex pt-[6px] gap-2">
							<FaEye className="hover:scale-125 hover:text-blue-500 cursor-pointer delay-200 dark:text-darkText dark:hover:text-blue-500" />
							<MdEdit className="hover:scale-125 hover:text-primaryPink cursor-pointer delay-200 dark:text-darkText dark:hover:text-primaryPink" />
							<MdDelete className="hover:scale-125 hover:text-red-500 cursor-pointer delay-200 dark:text-darkText dark:hover:text-red-500" />
					</div>
					</div>
					<p className="text-sm"> <span className="font-medium">Sede:</span> {cita.Branch.branchName}</p>
					<p className="text-sm"> <span className="font-medium">Especialista:</span> {cita.User.name} {cita.User.lastName}</p>
					<p className="text-sm"><span className="font-medium">Procedimiento:</span> {cita.Service.serviceName}</p>
					{/* <p className="text-sm"><span className="font-medium">Duración:</span> {cita.Service.duration} min</p>
					<p className="text-sm"><span className="font-medium">Precio:</span> {cita.Service.price}$</p>
					<p className="text-sm"><span className="font-medium">Observaciones:</span> {cita.obs}</p> */}
				</div>
		  </div>)
		})}
		</div>
		</div>
	);
}

export default Calendar