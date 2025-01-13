import React, {useState} from "react";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import "./YandexMap.css";

const initCoordinates = [55, 37]

interface YandexMapProps {
    coordinates?: [number, number];
    onCoordinatesChange?: (coordinates?: [number, number]) => void;
    setAddress?: (value: string) => void;
}

export const YandexMap: React.FC<YandexMapProps> = ({
                                                        coordinates,
                                                        onCoordinatesChange,
                                                        setAddress
                                                    }) => {
    const [yamaps, setYamaps] = useState<null | any>(null);
    const handleMapClick = async (event: any) => {
        const coords = event.get("coords") as [number, number];
        console.log("Coordinates clicked:", coords);

        if (onCoordinatesChange) {
            onCoordinatesChange(coords);
            if(setAddress){
                const data = await yamaps
                    .geocode(coords)
                    .then((data: any) => data.geoObjects.get(0));

                const name = data?.getAddressLine(); // Адрес
                const locality = data?.getLocalities(); // [Местоположение, город и т.д.]
                const country = data?.getCountry(); // Страна
                setAddress(name)
                console.log("name", name);
                console.log("locality", locality);
                console.log("country", country);
            }
        }
    };

    return (
        <div className='map-wrap'>
            <YMaps
                query={{
                    apikey: "29294198-6cdc-4996-a870-01e89b830f3e",
                    lang: "ru_RU",
                }}
                preload
            >
                <Map
                    modules={["Placemark", "geocode"]}
                    width="100%"
                    height={600}
                    defaultState={{center: coordinates || initCoordinates, zoom: 10}}
                    onClick={handleMapClick}
                    options={{
                        suppressMapOpenBlock: true,
                        copyrightLogoVisible: false,
                    }}
                    onLoad={setYamaps}
                >
                    {coordinates && <Placemark geometry={coordinates}/>}
                </Map>
            </YMaps>
        </div>
    );
};
