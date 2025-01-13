import React, {useState} from "react";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";

interface YandexMapProps {
    initialCoordinates?: [number, number];
    onCoordinatesChange?: (coordinates?: [number, number]) => void;
}

export const YandexMap: React.FC<YandexMapProps> = ({
                                                        initialCoordinates,
                                                        onCoordinatesChange,
                                                    }) => {
    const [yamaps, setYamaps] = useState<null | any>(null);
    const handleMapClick = async (event: any) => {
        const coords = event.get("coords") as [number, number];
        console.log("Coordinates clicked:", coords);

        if (onCoordinatesChange) {
            onCoordinatesChange(coords);
            const data = await yamaps
                .geocode(coords)
                .then((data: any) => data.geoObjects.get(0));

            const name = data?.getAddressLine(); // Адрес
            const locality = data?.getLocalities(); // [Местоположение, город и т.д.]
            const country = data?.getCountry(); // Страна
            console.log("name", name);
            console.log("locality", locality);
            console.log("country", country);
        }
    };

    return (
        <div style={{width: "100%", height: "600px"}}>
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
                    defaultState={{center: initialCoordinates, zoom: 10}}
                    onClick={handleMapClick}
                    options={{
                        suppressMapOpenBlock: true,
                        copyrightLogoVisible: false,
                    }}
                    onLoad={setYamaps}
                >
                    <Placemark geometry={initialCoordinates}/>
                </Map>
            </YMaps>
        </div>
    );
};
