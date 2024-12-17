import { Input, Select } from 'antd';
import s from './FilterCharacters.module.scss'
import { SearchOutlined } from '@ant-design/icons';

const FilterCharacters = ({ updateFilters, queryParams }) => {

  return (
    <div className={s.filter__cont}>
      <Input
        className={s.filter}
        placeholder='Name'
        onInput={(event) => updateFilters({name: event.target.value, page: 1})}
        value={queryParams.name? queryParams.name : ""}  
        prefix={<SearchOutlined />}
        style={{
          height: 56,
        }}
      />
      <Select onChange={(value) => updateFilters({species: value, page: 1})}
        className={s.filter}
        value={queryParams.species? queryParams.species : ""}
        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All Species',
        }, {
          value: 'Human',
          label: 'Human',
        },
        {
          value: 'Alien',
          label: 'Alien',
        },
        ]}
      />
      <Select onChange={(value) => updateFilters({gender: value, page: 1})}
        className={s.filter}
        value={queryParams.gender? queryParams.gender : ""}  
        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All Genders',
        }, {
          value: 'male',
          label: 'Male',
        }, {
          value: 'female',
          label: 'Female',
        }, {
          value: 'genderless',
          label: 'Genderless',
        }, {
          value: 'unknown',
          label: 'Unknown',
        },
        ]}
      />
      <Select onChange={(value) => updateFilters({status: value, page: 1})}
        className={s.filter}
        value={queryParams.status? queryParams.status : ""}  
        defaultValue=''
        style={{
          height: 56,
        }}
        options={[{
          value: '',
          label: 'All status',
        }, {
          value: 'alive',
          label: 'Alive',
        }, {
          value: 'dead',
          label: 'Dead',
        }, {
          value: 'unknown',
          label: 'Unknown',
        },
        ]} />
    </div>
  )
}

export default FilterCharacters;