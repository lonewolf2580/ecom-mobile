import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { Id } from '@/convex/_generated/dataModel';
import { Image } from '@/components/ui/image';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { ButtonText } from '@/components/ui/button';

dayjs.extend(relativeTime);

export default function Profile() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [updated, setUpdated] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)
   
  const userData = useQuery(api.userFunctions.currentUser);
  const updateUserData = useMutation(api.userFunctions.updateUser);
  const generateUploadUrl = useMutation(api.userFunctions.generateUploadUrl);
  const updateUserImage = useMutation(api.userFunctions.updateUserImage);

  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        // setImage(result.assets[0].uri);
        console.log(result.assets[0]);
        setUploading(true)
        const file = result.assets[0]
        
        if (file) {
          // Upload Image
          const postUrl = await generateUploadUrl()
          console.log(postUrl);
          
          const response = await fetch(file.uri);
          const blob = await response.blob();
          const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": blob.type },
            body: blob,
          });
          const { storageId } = await result.json();
          console.log(storageId);
          
          updateUserImage({
            id: userData?._id as Id<"users">,
            image: storageId
          })
          setImage(storageId)
        }
        setUploading(false)
        setUploaded(true)
      } else {
        alert('You did not select any image.');
      }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setUploading(true)
      const file = e?.target?.files ? e.target.files[0] : ''
      
      if (file) {
        // Upload Image
        const postUrl = await generateUploadUrl()
        console.log(postUrl);
        
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file!.type },
          body: file,
        });
        const { storageId } = await result.json();
        console.log(storageId);
        
        setImage(storageId)
        updateUserImage({
          id: userData?._id as Id<"users">,
          image: storageId
        })
      }
      setUploading(false)
      setUploaded(true)
    }

  useEffect(() => {
    if (userData?._id) {
      setId(userData?._id)
      setLoading(false)
    }
  }, [userData])

  if (loading) {
    return <ActivityIndicator />
  }
  
  return (
    <View style={{ padding: 20 }}>
      
      <>
        <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf:'center', marginBottom: 20 }}>{userData?.role == 'seller' && "Seller Account"}</Text>

        {userData?.image ?<View className='w-full flex items-center justify-center'>
          <Image source={'https://pastel-chinchilla-353.convex.site/getImage?storageId='+userData?.image} className='w-[200px] h-[200px] rounded-full' alt={userData?.name} />
        </View>
        :
        <View style={{
            alignItems: 'center',
            margin: 0
          }}>
            <Button title='Choose a photo' onPress={pickImageAsync} />
            {uploading && <ActivityIndicator />}
        </View>
        }
      
      <>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{userData?.name}</Text>
        <Text style={{ fontSize: 18, color: 'gray' }}>{userData?.email}</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Account Created {dayjs(userData?._creationTime).fromNow()}.</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>{userData?.phone}</Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>{userData?.address}</Text>
        {/* <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20, color: 'red' }}>{!userData?.role && "Have Products to Sell? Contact Admin to become a seller(linuslincom@gmail.com)\n Business and Services are subject to verification! "}</Text> */}
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Update Profile</Text>
        <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          console.log(name);
        }}
        />
        <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          console.log(name);
        }}
        />
        <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10, marginBottom: 10 }}
        placeholder="Location for Deliveries or Business Address"
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          console.log(address);
        }}
        />
        <Button title="Update" onPress={() => {
            setLoading(true)
            updateUserData({
              id: id as Id<"users">,
              phone: phone,
              name: name,
              address: address,
            }).then((res) => {
              console.log(res);
              alert('Profile updated successfully');
              setLoading(false)
            }).catch(
              (err) => {
                console.log(err);
                alert(err);
              }
            );
          }} />
      </>
      
      </>
    </View>
  )
}