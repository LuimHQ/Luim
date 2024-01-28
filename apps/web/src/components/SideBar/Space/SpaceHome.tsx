'use client';
import { Button } from '@components/ui/button';
import { supabase } from '@lib/supabaseClient';
import { Database, Tables } from '@models/supabase';
import React, { useCallback, useEffect, useState } from 'react';

const SpaceHome = () => {
    const [spaces, setSpaces] = useState<Array<Tables<'spaces'>>>([]);
    const [loading, setLoading] = useState(false);
    const [toFetch, setToFetch] = useState(false);
    const getProfile = async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from('spaces')
                .select('*');

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setSpaces(data);
            }
        } catch (error) {
            alert('Error loading user data!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, [toFetch]);
    return (
        <div>
            {loading ? (
                <div>Loading</div>
            ) : (
                <div className="">
                    <div className="grid grid-cols-1 auto-cols-auto">
                        {spaces?.map((item) => (
                            <div key={item.id} className="">
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={() => {
                            setToFetch(!toFetch);
                        }}
                    >
                        Fetch again
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SpaceHome;
