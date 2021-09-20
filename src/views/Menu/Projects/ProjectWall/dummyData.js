export default {
    projectName: 'Project Name',
    client: {
        id: 1,
        name: 'John Smith',
    },
    professional: {
        id: 2,
        name: 'John Smurf',
    },
    contractValue: 1000000000,
    stratingDate: '2021-09-07',
    closingDate: '2021-09-08',
    keyMilestones: [
        { activities: 'Meeting Date', date: '2021-09-07' },
        { activities: 'MoM Submission', date: '2021-09-07' },
        { activities: 'Submission Approval', date: '2021-09-07' },
        { activities: 'Payment Date', date: '2021-09-07' },
        { activities: 'Payment acknowledgement', date: '2021-09-07' },
    ],
    meeting: {
        link: 'https://www.google.com/',
        date: '2021-09-07',
        startTime: '09:00:00',
        endTime: '12:00:00',
    },
    activities: [
        {
            id: 1,
            category: 'discussion',
            createdAt: '2021-09-09 12:30:10',
            createdBy: {
                id: 1,
                name: 'John Smith'
            },
            meeting: {
                date: '2021-09-07',
                startTime: '09:00:00',
                endTime: '12:00:00',
            },
            attendees: {
                client: {
                    id: 1,
                    name: 'John Smith',
                },
                professional: {
                    id: 2,
                    name: 'John Smurf',
                },
            },
            additionalAttendees: 'Additional',
            values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            files: [
                {
                    id: 1,
                    name: 'Document 1',
                    link: 'https://www.google.com/'
                },
                {
                    id: 2,
                    name: 'Document 2',
                    link: 'https://www.google.com/'
                }
            ],
            replies: [],
        },
        {
            id: 2,
            category: 'discussion',
            createdAt: '2021-09-09 12:30:10',
            createdBy: {
                id: 1,
                name: 'John Smith'
            },
            meeting: {
                date: '2021-09-07',
                startTime: '09:00:00',
                endTime: '12:00:00',
            },
            attendees: {
                client: {
                    id: 1,
                    name: 'John Smith',
                },
                professional: {
                    id: 2,
                    name: 'John Smurf',
                },
            },
            additionalAttendees: 'Additional',
            values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            files: [
                {
                    id: 1,
                    name: 'Document 1',
                    link: 'https://www.google.com/'
                },
                {
                    id: 2,
                    name: 'Document 2',
                    link: 'https://www.google.com/'
                }
            ],
            replies: [
                {
                    id: 1,
                    createdBy: {
                        id: 1,
                        name: 'John Smith'
                    },
                    createdAt: '2021-09-09 12:30:10',
                    values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    id: 1,
                    createdBy: {
                        id: 1,
                        name: 'John Smith'
                    },
                    createdAt: '2021-09-09 12:30:10',
                    values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                }
            ],
        },
        {
            id: 3,
            category: 'deliverable',
            createdAt: '2021-09-09 12:30:10',
            createdBy: {
                id: 1,
                name: 'John Smith'
            },
            meeting: {
                date: '2021-09-07',
                startTime: '09:00:00',
                endTime: '12:00:00',
            },
            attendees: {
                client: {
                    id: 1,
                    name: 'John Smith',
                },
                professional: {
                    id: 2,
                    name: 'John Smurf',
                },
            },
            additionalAttendees: 'Additional',
            values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            files: [
                {
                    id: 1,
                    name: 'Document 1',
                    link: 'https://www.google.com/'
                },
                {
                    id: 2,
                    name: 'Document 2',
                    link: 'https://www.google.com/'
                }
            ],
            status: 'pending', // pending, approved, resubmit, draft
            replies: [
                {
                    id: 1,
                    createdBy: {
                        id: 1,
                        name: 'John Smith'
                    },
                    createdAt: '2021-09-09 12:30:10',
                    values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    id: 1,
                    createdBy: {
                        id: 1,
                        name: 'John Smith'
                    },
                    createdAt: '2021-09-09 12:30:10',
                    values: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                }
            ],
        },
    ],
    files: [
        {
            id: 1,
            url: '',
            mime: 'image',
        },
        {
            id: 2,
            url: '',
            mime: 'file',
        },
        {
            id: 3,
            url: '',
            mime: 'video',
        }
    ]
}