import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fiedlsCreatePage } from '@/commons/FieldsDataObj';
import { getItemFromLocalStorage } from '@/utils/localStorage';
import Select from 'react-select';

const ProvinceDistrictList = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [value] = useState(fiedlsCreatePage);

    const itemLocal = getItemFromLocalStorage('createLeter')


    useEffect(() => {
        if (itemLocal) {
            itemLocal?.confirmProvince && (value.confirmProvince = itemLocal?.confirmProvince)
            itemLocal?.confirmDistrict && (value.confirmDistrict = itemLocal?.confirmDistrict)
            itemLocal?.confirmWard && (value.confirmWardt = itemLocal?.confirmWard)
        } else {
            value.confirmProvince = ''
            value.confirmDistrict = ''
            value.confirmWardt = ''
        }
    }, [])

    useEffect(() => {
        // Gọi API để lấy danh sách tỉnh
        axios.get('https://vapi.vnappmob.com/api/province/')
            .then((response) => {
                setProvinces(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

    const handleProvinceChange = (e) => {
        const provinceId = e.value;
        setSelectedProvince(provinceId);

        // Gọi API để lấy danh sách quận/huyện theo tỉnh đã chọn
        axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
            .then((response) => {
                setDistricts(response.data.results);
                setWards([]);
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    };

    useEffect(() => {
        value.confirmProvince = provinces.find((p) => p.province_id === selectedProvince)?.province_name;
        value.confirmDistrict = districts.find((d) => d.district_id === selectedDistrict)?.district_name;
        value.confirmWardt = wards.find((w) => w.ward_id === selectedWard)?.ward_name;

    }, [selectedProvince, selectedDistrict, selectedWard]);

    const handleDistrictChange = (e) => {
        const districtId = e.value;
        setSelectedDistrict(districtId);

        // Gọi API để lấy danh sách phường/xã theo quận/huyện đã chọn
        axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
            .then((response) => {
                setWards(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching wards:', error);
            });
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.value);
    };

    const optionListProvinces = provinces.map(function (item) {
        return { value: item?.province_id, label: item?.province_name }
    });

    const optionListDistrict = districts.map(function (item) {
        return { value: item?.district_id, label: item?.district_name }
    });

    const optionListWards = wards.map(function (item) {
        return { value: item?.ward_id, label: item?.ward_name }
    });

    return (
        <div className='address_province_'>

            <Select
                options={optionListProvinces}
                placeholder={itemLocal?.confirmProvince ? itemLocal?.confirmProvince : 'Chọn Tình/Thành'}
                className='form_sellect_control select_province'
                name='form_sellect_stt'
                onChange={handleProvinceChange}
                defaultValue={itemLocal?.confirmProvince}
            />
   
            <Select
                options={optionListDistrict}
                placeholder={itemLocal?.confirmDistrict ? itemLocal?.confirmDistrict : 'Chọn Quận/Huyện'}
                className='form_sellect_control select_district'
                name='form_sellect_stt'
                onChange={handleDistrictChange}
                defaultValue={itemLocal?.confirmDistrict}
            />

            <Select
                options={optionListWards}
                placeholder={itemLocal?.confirmWard ? itemLocal?.confirmWard : 'Chọn Phường/Xã'}
                className='form_sellect_control select_wardt'
                name='form_sellect_stt'
                onChange={handleWardChange}
                defaultValue={itemLocal?.confirmWard}
            />
            
        </div>
    );
};

export default ProvinceDistrictList;
