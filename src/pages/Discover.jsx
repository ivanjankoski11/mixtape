import {genres} from "../assets/constants"
import { Loader } from "../components";
import SongCard from "../components/SongCard"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch,useSelector } from "react-redux";
import DiscoverSkeleton from "../components/DiscoverSkeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Discover = () => {

    const despatch = useDispatch();
    const activeSong = useSelector((state) => { return state.persistedReducer.player.activeSong});
    const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying})
    const { data, isFetching, error} = useGetTopChartsQuery();

    const [filtered,setFiltered] = useState('');

    useEffect(()=>{
        setTimeout(() => window.scrollTo(0,0), 1000);
    },[])

    const handleGenre = (e) =>{
        console.log(e.target.value);
    }

    if(isFetching) return(<><DiscoverSkeleton /></>  )
    if(error) return (<DiscoverSkeleton />)

    return(
        <div className="flex flex-col px-10 pt-6">
            <div className="w-full flex justify-between items-center sm:flex-row 
            flex-col mt-4 mb-10">
                <Link to={`/search`}>
                    <h2 className="font-bold text-3xl text-white ">Discover</h2>
                </Link>
                
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-10">
                {data?.tracks.map((song,i)=>{
                        return(
                            <SongCard song={song} key={song.key}
                             isPlaying={isPlaying}
                             activeSong={activeSong}
                             i={i}
                             data={data.tracks}/>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Discover;
