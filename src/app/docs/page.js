import Link from "next/link";

export default function Docs() {

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="w-6/12">
                <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                    <Link href="/docs" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Settings
                    </Link>

                </div>
            </div>
        </div>

    )
}