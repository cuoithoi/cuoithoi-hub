import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fiedlsCreatePage } from '@/commons/FieldsDataObj';

const ProvinceDistrictList = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    const [value] = useState(fiedlsCreatePage);

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
        const provinceId = e.target.value;
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
        const districtId = e.target.value;
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
        setSelectedWard(e.target.value);
    };

    return (
        <div className='address_province_'>
            <select
                className='form_sellect_control select_province'
                name='form_sellect_stt'
                value={selectedProvince} onChange={handleProvinceChange}
            >
                <option value='-1'>Chọn Tình/Thành</option>
                {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                        {province.province_name}
                    </option>
                ))}
            </select>
            <select
                className='form_sellect_control select_district'
                name='form_sellect_stt'
                value={selectedDistrict} onChange={handleDistrictChange}
            >
                <option value='-1'>Chọn Quận/Huyện</option>
                {districts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>
                        {district.district_name}
                    </option>
                ))}
            </select>
            <select
                className='form_sellect_control select_wardt'
                name='form_sellect_stt'
                value={selectedWard} onChange={handleWardChange}
            >
                <option value='-1'>Chọn Phường/Xã</option>
                {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProvinceDistrictList;
