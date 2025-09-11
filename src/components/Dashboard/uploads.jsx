import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '../../components';
import Sidepanel from './sidepanel';
import classNames from 'classnames';

const Uploads = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`main w-screen h-screen`}>
      <NavBar />
      <div className={`flex justify-start w-full h-full `}>
        <Sidepanel open={open} setOpen={setOpen} />
        <div className={`uploads ${open ? 'w-[95%]' : 'w-[80%]'} h-full ${open ? 'ml-[12%]' : 'ml-[18%]'} `}>
          <div className={`w-full h-full grid grid-cols-1 gap-6 mb-6`}>
            <div className="flex items-center justify-center flex-col">
              <div className={`text text-4xl`}>Uploads</div>
              <div className="w-[78vw] bg-[#f1f5f9] dark:bg-[#E7E5E4] flex items-center justify-center m-5 shadow-[2px_4px_8px_rgba(0,0,0,0.25)] rounded-2xl max-md:flex-col px-3">
                <img className="w-64 rounded-2xl m-3" src="https://loremflickr.com/640/480" alt="" />
                <div className="flex items-center justify-center w-full flex-col m-2 max-md:p-3">
                  <div className="flex items-center justify-center w-full">
                    <div className="flex items-center justify-left text-3xl text-black/[0.75] w-full">Linear Algebra</div>
                    <div className="rounded-md m-2 p-1 flex items-center justify-center bg-[#FBBF24] shadow-[1.3333px_1.33333px_2.66667px_rgba(0,0,0,0.25)]">
                      <button>
                        <img className="w-7" src="/Bookmark.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-left w-full flex-wrap">
                    <div className="bg-black/[0.68] m-1 px-5 py-1 text-sm rounded-2xl text-white">NKM notes</div>
                    <div className="bg-black/[0.68] m-1 px-5 py-1 text-sm rounded-2xl text-white">Midsems</div>
                    <div className="bg-black/[0.68] m-1 px-5 py-1 text-sm rounded-2xl text-white">Book</div>
                    <div className="bg-black/[0.68] m-1 px-5 py-1 text-sm rounded-2xl text-white">Quiz</div>
                  </div>
                  <div className="flex items-end justify-end w-full h-28">
                    <button className="theme-btn-shadow m-2 px-5 py-2 bg-[#3B82F6] shadow-[0px_4px_11.3333px_rgba(0,0,0,0.25)] text-white rounded-lg">
                      Download
                    </button>
                    <a href="/details/1">
                      <button className="theme-btn-shadow m-2 px-5 py-2 bg-[#3B82F6] shadow-[0px_4px_11.3333px_rgba(0,0,0,0.25)] text-white rounded-lg">
                        Details
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploads;
