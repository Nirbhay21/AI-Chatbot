import { useEffect, useState } from "react";
import { dummyPlans } from "../assets/dummyData/assets";

interface Plan {
  _id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
}

const CreditsPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchPlans = async () => {
    setPlans(dummyPlans);
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-15 pb-12 max-w-7xl h-screen overflow-y-scroll">
      <h2 className="xl:mt-30 mb-10 font-semibold text-3xl text-center text-gray-800 dark:text-white">Credit Plans</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div key={plan._id} className={`border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ? "bg-purple-50 dark:bg-purple-900" : "bg-white dark:bg-transparent"}`}>
            <div className="flex-1">
              <h3 className="mb-2 font-semibold text-gray-900 text-xl dark:text-white">{plan.name}</h3>
              <p className="mb-4 font-bold text-2xl text-purple-600 dark:text-purple-300">${plan.price}
                <span className="font-normal text-base text-gray-600 dark:text-purple-200">{` / ${plan.credits} credits`}</span>
              </p>
              <ul className="space-y-1 text-gray-700 text-sm dark:text-purple-200 list-disc list-inside">
                {plan.features.map((feature, index) => (
                  <li key={index} className="">{feature}</li>
                ))}
              </ul>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 mt-6 py-2 rounded font-medium text-white transition-colors cursor-pointer">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreditsPage