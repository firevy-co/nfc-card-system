import React from "react";
import { FiEye, FiEdit, FiShare2 } from "react-icons/fi";

export default function TemplateCard({ title, path, type }) {

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition">

            {/* Preview */}

            <div className="h-[210px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">

                <span className="text-gray-400 text-sm">
                    Card Preview
                </span>

            </div>

            {/* Title */}

            <h3 className="font-semibold text-gray-800">
                {title}
            </h3>

            {/* Link */}

            <p className="text-xs text-gray-400 mb-4">
                {path}
            </p>

            {/* Buttons */}

            <div className="flex gap-2">

                {type === "share" ? (

                    <>
                        <button className="flex-1 flex items-center justify-center gap-1 bg-black text-white py-2 rounded-md text-sm">
                            <FiShare2 size={14} />
                            Share
                        </button>

                        <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-md text-sm">
                            <FiEdit size={14} />
                            Edit
                        </button>
                    </>

                ) : (

                    <>
                        <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-md text-sm">
                            <FiEye size={14} />
                            Preview
                        </button>

                        <button className="flex-1 flex items-center justify-center gap-1 border py-2 rounded-md text-sm">
                            <FiEdit size={14} />
                            Edit
                        </button>
                    </>

                )}

                <button className="px-3 border rounded-md">
                    ...
                </button>

            </div>

        </div>
    );
}