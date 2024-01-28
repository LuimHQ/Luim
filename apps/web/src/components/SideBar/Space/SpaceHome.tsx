'use client';
import SpaceCard from '@components/SpaceCard';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/Input';
import { AuthContext } from '@contexts/AuthContext';
import { supabase } from '@lib/supabaseClient';
import { Database, Tables } from '@models/supabase';
import { Table } from 'drizzle-orm';
import React, { useCallback, useContext, useEffect, useState } from 'react';

const SpaceHome = () => {
    const authProvider = useContext(AuthContext);
    const [spaces, setSpaces] = useState<Array<any>>([]);
    const [joinedSpaces, setJoinedSpaces] = useState<Array<any>>([]);
    const [spacesLoading, setSpacesLoading] = useState(false);
    const [JoinedSpaceloading, setJoinedSpaceLoading] = useState(false);
    const [toFetch, setToFetch] = useState(false);
    const [newSpaceName, setNewSpaceName] = useState<string>('');

    const addNewSpace = async () => {
        try {
            console.log('New spaceName: ', newSpaceName);
            console.log('Auth id: ', authProvider?.user?.id);
            const { data, error } = await supabase
                .from('spaces')
                .insert([
                    { title: newSpaceName, created_by: authProvider?.user?.id },
                ])
                .select();
            if (data) {
                setToFetch(!toFetch);
            }
        } catch (error) {
            alert('Error in adding new space');
        }
    };
    // get all available public spaces in the database
    const getSpaces = async () => {
        try {
            setSpacesLoading(true);

            const { data, error, status } = await supabase
                .from('spaces')
                .select(`id, title`);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                const spaceIds = joinedSpaces.map((item) => item.space_id);

                // Filter the second array based on the condition id not in spaceIds
                const filteredArray = data.filter(
                    (item) => !spaceIds.includes(item.id)
                );
                console.log('Filtered array: ', filteredArray);
                setSpaces(filteredArray);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setSpacesLoading(false);
        }
    };

    // get all public spaces joined by the user
    const getJoinedSpaces = async () => {
        try {
            setJoinedSpaceLoading(true);
            const { data, error, status } = await supabase
                .from('users_in_spaces')
                .select(
                    `
                        space_id, spaces(id, title)
                        `
                )
                .eq('user_id', authProvider?.user?.id);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data);
                setJoinedSpaces(data);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setJoinedSpaceLoading(false);
        }
    };
    useEffect(() => {
        getJoinedSpaces().then((data) => getSpaces());
    }, [toFetch]);
    return (
        <div>
            <div className="flex flex-col gap-8">
                <div>Joined</div>
                {!JoinedSpaceloading ? (
                    <div className="grid grid-cols-2 gap-2">
                        {joinedSpaces?.map((item, index) => (
                            <SpaceCard
                                key={index}
                                item={item.spaces}
                                toRemove={true}
                                toUpdate={() => {
                                    setToFetch(!toFetch);
                                }}
                            ></SpaceCard>
                        ))}
                    </div>
                ) : (
                    <div>Loading</div>
                )}
                <div>Explore more spaces</div>

                {spacesLoading ? (
                    <div>Loading</div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        {spaces?.map((item, index) => (
                            <SpaceCard
                                key={index}
                                item={item}
                                toRemove={false}
                                toUpdate={() => {
                                    setToFetch(!toFetch);
                                }}
                            ></SpaceCard>
                        ))}
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <div>Create new space!</div>
                    <div className="flex flex-row items-center gap-2">
                        <Input
                            type="text"
                            onChange={(e) => setNewSpaceName(e.target.value)}
                        ></Input>
                        <div className="h-full">
                            <Button
                                className=""
                                variant={'default'}
                                onClick={async () => {
                                    await addNewSpace();
                                }}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={() => {
                        setToFetch(!toFetch);
                    }}
                >
                    Fetch again
                </Button>
            </div>
        </div>
    );
};

export default SpaceHome;
