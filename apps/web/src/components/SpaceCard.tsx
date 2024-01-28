import { AuthContext } from '@contexts/AuthContext';
import { supabase } from '@lib/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from './ui/context-menu';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui/dialog';
import { space_mono } from '../app/layout';
import { Tables } from '@models/supabase';
import { Input } from './ui/Input';

const SpaceCard = (prop) => {
    const { item, toRemove, toUpdate } = prop;
    const [spaceNotes, setSpaceNotes] = useState<Array<any>>([]);
    const listAllNotes = async () => {
        try {
            let { data: notes, error } = await supabase
                .from('notes')
                .select('id, space_id, title, content')
                .eq('space_id', item.id);
            if (notes != null) {
                console.log('All notes of the space: ', notes);
                setSpaceNotes([...notes]);
            }
        } catch (error) {
            alert('Error while loading space notes...');
        }
    };

    const authProvider = useContext(AuthContext);
    const updateUserSpaces = async () => {
        if (toRemove) {
            const { error } = await supabase
                .from('users_in_spaces')
                .delete()
                .eq('user_id', authProvider?.user?.id)
                .eq('space_id', item.id);
        } else {
            const { data, error } = await supabase
                .from('users_in_spaces')
                .insert([
                    { user_id: authProvider?.user?.id, space_id: item.id },
                ])
                .select();
        }
    };
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [filtered, setFiltered] = useState<Array<any>>([]);
    useEffect(() => {
        setFiltered(
            spaceNotes?.filter((item) =>
                item?.title.toLowerCase().match(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);
    return (
        <div>
            <Dialog>
                <DialogTrigger
                    className={`bg-transparent w-full ${space_mono.className}`}
                    onClick={(e) => {
                        listAllNotes();
                    }}
                >
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <div
                                className={`border-2 p-4 border-primary/40 cursor-pointer text-sm rounded-lg hover:bg-primary/20 ${space_mono.className}`}
                            >
                                {item.title}
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateUserSpaces().then((data) => {
                                        toUpdate();
                                    });
                                }}
                            >
                                {toRemove ? (
                                    <div>Disconnect from your space</div>
                                ) : (
                                    <div>Connect to your space</div>
                                )}
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-3xl">
                    <DialogHeader>
                        <DialogTitle className="mb-4">{item.title}</DialogTitle>
                        <DialogDescription className="flex flex-col gap-8">
                            <div>
                                <Input
                                    type="text"
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                    }}
                                    placeholder="Enter keyword to search in this space"
                                />
                            </div>
                            <div>
                                {filtered.length
                                    ? filtered?.map((item, index) => (
                                          <div key={index}>{item.title}</div>
                                      ))
                                    : spaceNotes?.map((item, index) => (
                                          <div key={index}>{item.title}</div>
                                      ))}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SpaceCard;
