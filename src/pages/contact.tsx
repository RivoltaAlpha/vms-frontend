export default function Contact() {
    return (
        <>
            <div className="mx-auto max-w-7xl px-4 text-neutral-content-200 bg-base-300">
                {/* Hero Map */}
                <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                    <p className="text-center text-3xl font-bold content md:text-5xl md:leading-10">
                    Share your thoughts...
                    </p>
                </div>
                <div className="mx-auto max-w-7xl py-12 md:py-24">
                    <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                        {/* contact from */}
                        <img
                            alt="Contact us"
                            className="lg:max-h-full sm: sm:block w-full rounded-lg object-cover lg:block"
                            src="images/contact.png"
                        />
                        <div className="flex items-center justify-center">
                            <div className="px-2 md:px-12">
                                <p className="text-2xl font-bold text-base-content-100 md:text-4xl">Get in touch</p>
                                <p className="mt-4 text-lg text-gray-600">
                                    Our friendly team would love to hear from you.
                                </p>
                                <form action="" className="mt-8 space-y-4">
                                    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="first_name"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="first_name"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="last_name"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="last_name"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="phone_number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="phone_number"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:text-black dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            cols={3}
                                        />
                                    </div>
                                    <button type="button" className="w-[300px] py-2 rounded ml-[50px] bg-red-500 btn btn-outline btn-primary"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <hr className="mt-6" />
        </>
    );
}  