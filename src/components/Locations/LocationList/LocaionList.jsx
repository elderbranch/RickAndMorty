import Logo from "../../../assets/404.webp"
import { useLocation } from '../../Context/LocationContext'
import { Pagination } from 'antd';
import FilterByInput from '../../FilterCharacters/FilterByInput';
import SkeletonCardItem from "../../Skeleton/SkeletonCardItem";
import EpisodeBox from "../../Episodes/EpisodeBox/EpisodeBox";

import s from './LocationList.module.css'
import LocationBox from "../locationBox/LocationBox";

const LocaionList = () => {
  const visibleItems = 8;
  const { data,
    locationName,
    setLocationName,
    curnLocationPage,
    setCurnLocationPage,
    totalPages,
    isLoading } = useLocation();

  return (
    <div className="cont">
      <div className={s.cont__logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <FilterByInput setFuction={setLocationName} value={locationName} placeholder='Filter by name' />
      <div className="grid">
        {isLoading ? (
          Array.from({ length: visibleItems }).map((_, index) => (
            <SkeletonCardItem key={index} />
          ))
        ) : (
          data.map((item) => (
            <LocationBox
              id={item.id}
              name={item.name}
              episode={item.type}
              date={item.dimension}
            />
          ))
        )}
      </div>
      {/* {error404 && <Error404 />} */}
      <Pagination onChange={setCurnLocationPage} current={curnLocationPage} total={totalPages * 10} className="pagination" showSizeChanger={false} />
    </div>
  )
}

export default LocaionList