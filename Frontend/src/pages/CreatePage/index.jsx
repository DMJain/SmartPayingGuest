import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';

import { usePostPg } from '../../hooks/pg.hooks';
import { useLoggedInUser } from '../../hooks/auth.hooks';

import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from 'firebase/storage';
import { storage } from '../../utlis/fireBase';
import { v4 } from 'uuid';
import {setAdsDataAfterCreation} from '../../store/slices/adSlice'

import Select from 'react-select';
import amenitiesData from '../../utlis/aminities';

import './style.css';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const [name, setName] = useState('');
    const [plot, setPlot] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [selectedAminties, setSelectedAminities] = useState([]);
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data : user} = useLoggedInUser();
    const { mutateAsync: postPgAsync } = usePostPg();

    const [isLoading, setIsLoading] = useState(false)

    const uploadFile = async (images) => {
        const urlImgs = [];
        for (const image of images) {
          if (!image) {
            continue; // Skip if no image selected
          }
      
          const storageRef = ref(storage, `images/${image.name + v4()}`); // Create a reference
          try {
            await uploadBytes(storageRef, image);
            const downloadUrl = await getDownloadURL(storageRef);
            urlImgs.push(downloadUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
          }
        }
        return urlImgs;
      };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const images = await uploadFile([image1, image2, image3, image4]);
            const data = await postPgAsync({
                ownerName: `${user.firstName} ${user.lastName}`,
                name,
                plot,
                street,
                city,
                state,
                country,
                pinCode: Number(pinCode),
                phoneNumber,
                price: Number(price),
                amenities,
                description,
                images : images,
            });
            dispatch(setAdsDataAfterCreation({
                _id: data._id,
                name,
                description,
                price: Number(price),
                imageURLs: images,
                amenities,
                owner: `${user.firstName} ${user.lastName}`,
            }));
            setName('');
            setPlot('');
            setStreet('');
            setCity('');
            setState('');
            setCountry('');
            setPinCode('');
            setPhoneNumber('');
            setPrice('');
            setAmenities([]);
            setSelectedAminities([]);
            setDescription('');
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
            navigate('/ad');
        } catch (error) {
            console.error('Error creating PG:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (selectedOption) => {
        setSelectedAminities(selectedOption);
    };

    useEffect(() => {
        if (selectedAminties.length > 0) {
            setAmenities(selectedAminties.map((option) => option.label));
        }
    }, [selectedAminties]);

    return (
        <div className="flex justify-center items-center">
            <div className="w-4/5 flex flex-col items-center gap-5">
                <div>
                    <h1 className="text-3xl font-bold">Create an Ad</h1>
                </div>
                <div className="w-2/5 flex flex-col gap-2">
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input
                            type="text"
                            className="grow"
                            placeholder="Daisy"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <div className="flex gap-2">
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            Plot
                            <input
                                type="text"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setPlot(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            Street
                            <input
                                type="text"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            City
                            <input
                                type="text"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            State
                            <input
                                type="text"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            Country
                            <input
                                type="text"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-1/2">
                            Pincode
                            <input
                                type="number"
                                className="grow"
                                placeholder="Daisy"
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </label>
                    </div>

                    <label className="input input-bordered flex items-center gap-2">
                        Phone Number
                        <input
                            type="text"
                            className="grow"
                            placeholder="Daisy"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Price
                        <input
                            type="number"
                            className="grow"
                            placeholder="Daisy"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        Aminities
                        <Select
                            options={amenitiesData}
                            value={selectedAminties}
                            onChange={handleSelect}
                            isMulti="true"
                            className="w-full bg-base-100"
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Descirption
                        <input
                            type="text"
                            className="grow"
                            placeholder="Daisy"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-secondary w-full"
                            multiple
                            onChange={(e) => setImage1(e.target.files[0])}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-secondary w-full"
                            multiple
                            onChange={(e) => setImage2(e.target.files[0])}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-secondary w-full"
                            multiple
                            onChange={(e) => setImage3(e.target.files[0])}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-secondary w-full"
                            multiple
                            onChange={(e) => setImage4(e.target.files[0])}
                        />

                </div>
                {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-200 opacity-75 z-50 flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
                <button className="btn btn-primary" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? 'Loading...' : 'Create'}
                </button>
            </div>
        </div>
    );
};

export default CreatePage;
