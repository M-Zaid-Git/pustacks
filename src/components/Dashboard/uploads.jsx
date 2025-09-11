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
                  <div className="flex items-end justify-end w-full h-28 space-x-3">
                    <button 
                      onClick={() => {
                        // Create demo download
                        const demoContent = `# Linear Algebra Notes\n\nThis is a demo file from ZESHO Educational Platform.\nIn a real application, this would be the actual academic resource.\n\nTags: NKM notes, Midsems, Book, Quiz`;
                        const blob = new Blob([demoContent], { type: 'text/plain' });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'linear_algebra_notes.txt';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                        alert('✅ Linear Algebra notes downloaded successfully!');
                      }}
                      className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </button>
                    <a href="/details/1">
                      <button className="px-6 py-3 text-sm font-semibold text-indigo-600 bg-white border-2 border-indigo-200 rounded-xl shadow-lg hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-0.5 transition-all duration-200">
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
