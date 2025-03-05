// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Checkbox } from "@/components/ui/checkbox";

// function Sidebar({ filters, setFilters }) {
//   return (
//     <div className="w-64 p-4 border-r">
//       <h2 className="font-bold mb-4">Available Doctors</h2>
//       <div>
//         <Checkbox
//           label="Dr. Wade Warren"
//           checked={filters.doctors.includes("Dr. Wade Warren")}
//           onChange={() =>
//             setFilters((prev) => ({
//               ...prev,
//               doctors: prev.doctors.includes("Dr. Wade Warren")
//                 ? prev.doctors.filter((d) => d !== "Dr. Wade Warren")
//                 : [...prev.doctors, "Dr. Wade Warren"],
//             }))
//           }
//         />
//       </div>

//       <h2 className="font-bold mt-4">Treatment Types</h2>
//       <div>
//         <Checkbox
//           label="Implants"
//           checked={filters.treatments.includes("Implants")}
//           onChange={() =>
//             setFilters((prev) => ({
//               ...prev,
//               treatments: prev.treatments.includes("Implants")
//                 ? prev.treatments.filter((t) => t !== "Implants")
//                 : [...prev.treatments, "Implants"],
//             }))
//           }
//         />
//       </div>
//     </div>
//   );
// }

// const Dashboard = () => {
    
//     const [filters, setFilters] = useState({ doctors: [], treatments: [] });

//     return (
//       <div className="flex">
//         <Sidebar filters={filters} setFilters={setFilters} />
//         <div className="flex-1">
//           <CalendarView filters={filters} />
//         </div>
//       </div>
//     );
// }

// export default Dashboard
