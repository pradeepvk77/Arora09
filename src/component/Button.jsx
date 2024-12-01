/* eslint-disable react/prop-types */
export default function Button({ callback, text = "button" }) {
    return (
        <button onClick={callback}
            className="bg-gradient-to-l from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold flex py-2 px-2 rounded  transform transition hover:scale-x-105 duration-300 ease-in-out"
            type="button">
            {text}
        </button>)
}