import {useState, useEffect} from "react";

export default function Modal({showModal, onClose, addReservation, children, office}) {
    const [isBrowser, setIsBrowser] = useState(false);
    // console.log(office);

    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleAddEvent = (e) => {
        e.preventDefault();
        addReservation();
    };

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    if (isBrowser && showModal) {
        return (
            <div id="myModal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 md:inset-0 flex items-center justify-center bg-black bg-opacity-25">
                <div className="relative max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
                    {children}
                    {/*<div className="flex justify-between items-start py-4 px-6 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add event for <span className="font-bold text-green-800">{office.name}</span></h3>
                        <button type="button" onClick={handleCloseClick} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="myModal">
                            x
                        </button>
                    </div>

                    <div className="py-4 px-6 space-y-6">
                        {children}
                    </div>

                    <div className="flex items-center justify-end py-4 px-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button data-modal-toggle="myModal" type="button" onClick={handleAddEvent} className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add event</button>
                        <button data-modal-toggle="myModal" type="button" onClick={handleCloseClick} className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Decline</button>
                    </div>*/}
                </div>
            </div>
        );
    } else {
        return null;
    }
}