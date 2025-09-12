import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SuggestFriends = () => {
  return (
    <div className="w-[220px] h-[220px] lg:w-[250px] lg:h-[220px] bg-[#ffffff] border border-[#dadde0db] rounded-xl hidden md:block">
      <div className="flex flex-col gap-5 my-3 h-full">

        <h5 className="text-cyan-800">SuggestFriends</h5> 
        <div className="flex justify-between mx-4 items-center">
        <div className="flex gap-2 items-center"> 
                <img
                    src='/suggest2.jpg'
                    alt="userImg"
                    className="w-8 h-8 rounded-full border-2 border-[#bdbdbd] object-cover bg-slate-200 "
                />
                <h5 className="text-xs font-semibold ">Waleed Mohsen</h5></div>
                    <FontAwesomeIcon
                                    icon={faPlus}
                                    className="bg-cyan-700 p-1 text-white rounded-full text-sm"
                                />
        </div>
       <div className="flex justify-between mx-4 items-center">
       <div className="flex gap-2 items-center"> 
             <img
                src='/suggest1.jpg'
                alt="userImg"
                className="w-10 h-10 rounded-full border-2 border-[#bdbdbd] object-cover bg-slate-200 "
              />
              <h5 className="text-xs font-semibold ">Amr Malek</h5></div>
                <FontAwesomeIcon
                                icon={faPlus}
                                className="bg-cyan-700 p-1 text-white rounded-full text-sm"
                              />
       </div>
       <div className="flex justify-between mx-4 items-center">
       <div className="flex gap-2 items-center"> 
             <img
                src='/suggest3.jpeg'
                alt="userImg"
                className="w-8 h-8 rounded-full border-2 border-[#bdbdbd] object-cover bg-slate-200 "
              />
              <h5 className="text-xs font-semibold">jasmin Ahmed</h5></div>
                <FontAwesomeIcon
                                icon={faPlus}
                                className="bg-cyan-700 p-1 text-white rounded-full text-sm"
                              />
       </div>
        </div>
        </div>
   
  )
}

export default SuggestFriends