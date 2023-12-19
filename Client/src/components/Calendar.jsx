import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../functions/calendar";
import cn from "../functions/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Calendar = () => {

  const days = ["S", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
		<div className="flex gap-10 justify-center sm:divide-x sm:w-1/2 mx-auto items-center xl:flex-row flex-col">
			<div className="w-96 h-96 ">
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center ">
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
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
												? "bg-black text-white"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
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
			<div className="h-96 w-96 sm:px-5 overflow-auto">
				<h1 className=" font-semibold">
					Schedule for {selectDate.toDate().toDateString()}
				</h1>
        <div className="flex flex-row gap-2">
				<button className="bg-secondaryPink px-1 rounded-md">08:00 a 12:00</button>
				<button className="bg-secondaryPink px-1 rounded-md">12:00 a 16:00</button>
				<button className="bg-secondaryPink px-1 rounded-md">16:00 a 18:00</button>
        </div>
        <div className="bg-beige border px-2 border-black mt-2 rounded-lg">
          <div className="flex flex-row justify-between">
          <h5 className="font-medium"> 10:00 - 10:15 <span>Tomas Bombau</span></h5> 
          <div className="flex pt-[6px]">
          <MdEdit />
          <MdDelete />
          </div>
          </div>
          <p className="text-sm">Especialista: Rami</p>
          <p className="text-sm">Procedimiento: Cejas</p>
        </div>
        <div className="bg-beige border px-2 border-black mt-2 rounded-lg">
          <div className="flex flex-row justify-between">
          <h5 className="font-medium"> 10:00 - 10:15 <span>Tomas Bombau</span></h5> 
          <div className="flex pt-[6px]">
          <MdEdit />
          <MdDelete />
          </div>
          </div>
          <p className="text-sm">Especialista: Rami</p>
          <p className="text-sm">Procedimiento: Cejas</p>
        </div>
        <div className="bg-beige border px-2 border-black mt-2 rounded-lg">
          <div className="flex flex-row justify-between">
          <h5 className="font-medium"> 10:00 - 10:15 <span>Tomas Bombau</span></h5> 
          <div className="flex pt-[6px]">
          <MdEdit />
          <MdDelete />
          </div>
          </div>
          <p className="text-sm">Especialista: Rami</p>
          <p className="text-sm">Procedimiento: Cejas</p>
        </div>
        <div className="bg-beige border px-2 border-black mt-2 rounded-lg">
          <div className="flex flex-row justify-between">
          <h5 className="font-medium"> 10:00 - 10:15 <span>Tomas Bombau</span></h5> 
          <div className="flex pt-[6px]">
          <MdEdit />
          <MdDelete />
          </div>
          </div>
          <p className="text-sm">Especialista: Rami</p>
          <p className="text-sm">Procedimiento: Cejas</p>
        </div>
        <div className="bg-beige border px-2 border-black mt-2 rounded-lg">
          <div className="flex flex-row justify-between">
          <h5 className="font-medium"> 10:00 - 10:15 <span>Tomas Bombau</span></h5> 
          <div className="flex pt-[6px]">
          <MdEdit />
          <MdDelete />
          </div>
          </div>
          <p className="text-sm">Especialista: Rami</p>
          <p className="text-sm">Procedimiento: Cejas</p>
        </div>
               
			</div>
		</div>
	);
}

export default Calendar