import React, { useState, useEffect } from "react";
import { countryList } from "../data/countries";
import { usStateList } from "../data/usStates";

interface LocationSearchProps {
    onSearch: (search: {
        city: string;
        country: string;
        state?: string;
    }) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
    const [city, setCity] = useState("");
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");

    const showStates = countryName === "Estados Unidos";

    useEffect(() => {
        if (!showStates) {
            setStateName("");
        }
    }, [showStates]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedCountry = countryList.find(c => c.name === countryName);

        if (!city || !selectedCountry) {
            alert("Por favor, introduce una ciudad y un país de la lista.");
            return;
        }

        let selectedStateCode: string | undefined = undefined;

        if (showStates && stateName) {
            const selectedState = usStateList.find(s => s.name === stateName);
            selectedStateCode = selectedState?.code;
        }

        onSearch({
            city,
            country: selectedCountry.code,
            state: selectedStateCode
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full"
        >
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Caracas"
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            />

            <input
                type="text"
                value={countryName}
                onChange={e => setCountryName(e.target.value)}
                placeholder="Venezuela"
                list="country-list"
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <datalist id="country-list">
                {countryList.map(c => (
                    <option key={c.code} value={c.name} />
                ))}
            </datalist>

            {showStates && (
                <>
                    <input
                        type="text"
                        value={stateName}
                        onChange={e => setStateName(e.target.value)}
                        placeholder="Florida"
                        list="state-list"
                        className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <datalist id="state-list">
                        {usStateList.map(s => (
                            <option key={s.code} value={s.name} />
                        ))}
                    </datalist>
                </>
            )}

            <button
                type="submit"
                className="flex-shrink-0 p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
            >
                <span>🔍</span>
            </button>
        </form>
    );
}
