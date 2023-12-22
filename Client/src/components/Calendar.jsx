import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { generateDate, months } from "../functions/calendar";
import cn from "../functions/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Loader from '../components/Loader';

//icons
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getCalendar } from "../redux/actions";

const Calendar = () => {

	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	const workingBranch = useSelector(state => state?.workingBranch)
	const token = useSelector(state => state?.token)
	const calendar = useSelector(state => state?.calendar)
	const workingBranchID = workingBranch.id
	const dispatch = useDispatch()
	const [branch, setBranch] = useState(workingBranchID);
	const [loading, setLoading] = useState(true);
	const dateNow = new Date();
	const day = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();
	const month = dateNow.getMonth()+1 < 10 ? `0${dateNow.getMonth()+1}` : dateNow.getMonth()+1;
	const [date, setDate] = useState(`${dateNow.getFullYear()}-${month}-${day}`);
	const [range, setRange] = useState("");

	
	useEffect(() => {
		dispatch(getCalendar(branch, date, range, {token: token}))
		.then(setLoading(false))
	}, [branch, date, range])


  return (
	<>
	{loading ? <Loader /> : (
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
											setDate(`${date.$y}-${date.$M+1 < 10 ? `0${date.$M+1}`: date.$M+1}-${date.$D < 10 ? `0${date.$D}` : date.$D}`)
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
						<button onClick= {()=>{range === 1 ? setRange("") : setRange(1)}} className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">06:00 a 10:00</button>
						<button onClick= {()=>{range === 2 ? setRange("") : setRange(2)}} className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">10:00 a 14:00</button>
						<button onClick= {()=>{range === 3 ? setRange("") : setRange(3)}} className="bg-white border border-black px-1 rounded-md hover:scale-105 dark:text-darkText dark:border dark:border-beige dark:bg-darkPrimary">14:00 a 19:00</button>
				</div>
				{calendar.length === 0 && <h4 className="mt-2 font-medium">Sin turnos hasta el momento</h4> }
				{calendar.map((cita, index) => {
					return (
					<div key={index} className={cita.current === false ? "bg-green-200 border px-2 border-black mt-2 rounded-lg" : "bg-red-200 border px-2 border-black mt-2 rounded-lg"}>
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
						</div>
				</div>)
				})}
			</div>
		</div> )}
	</>);
}

export default Calendar