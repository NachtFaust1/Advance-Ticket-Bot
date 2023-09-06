/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

module.exports = {
    bot: {
        vote: {
            content: "*This command will be soon implemented to the system!*"
        },
        ping: {
            title: "Returns Latency and API Ping!",
            fields1: "Websocket Latency:",
            fields2: "API Latency:",
            footer: "Powered by Ticket Prime",
            green: "🟢 FAST",
            yellow: "🟡 SLOW",
            red: "🔴 SLOW AF",
        },
        language: {
            lang_title: "Language System",
            lang_description: "*Default language has been changed successfully.*",
            lang_from: "Old Language:",
            lang_to: "New Language:",
            lang_error: "*Something went wrong please try again later.*",
            lang_footer: "Powered by Ticket Prime"
        },
        uptime: {
            title: "Uptime of: {clientUser}",
            fields1: "*Up Since:*",
            fields2: "*Launched at:*",
            footer: "Powered by Ticket Prime",
        },
        invite: {
            description: "*Thanks for choosing **{clientUser}** as your {clientAbout} bot, you can invite me clicking the invite button bellow.*",
            footer: "Invite {client}",
            button: {
                label: "Invite Me",
                style: "5"
            }
        },
        help: {
            overviewTitle: "{clientUser} | Help Panel | Overview Page",
            overviewFieldsTitle: {
                one: "Bot Features:",
                two: "Bot Stats:",
                three: "Developer:"
            },
            overviewFieldsValue: {
                one: ">>> ***{clientMention}** {clientDescription}*",
                two: ">>> <:omega_guild:1072826074666377306> **Guilds:** \` {clientGuild} \`\n<:omega_stats:1072825816536317992> **Bot Ping:** \`{clientPing}ms\`\n<:omega_slash:1072826070069428234> **slashC:** \` {clientSlash} \`",
                three: "> *This amazing bot was coded by, [Lucius](https://devbenz.me), with many features available and more coming soon!*"
            },
            overviewFooter: "Use the menu to view all my commands!",
            overviewPageFooter: {
                one: "Page 1 • 3",
                two: "Page 2 • 3",
                three: "Page 3 • 3"
            },
            info: {
                title: "{clientUser} | Help Panel | Info Page",
                value: {
                    one: "*Get info about all the commands*",
                    two: "*Invite the bot to your server*",
                    three: "*Get the response time of the bot*",
                    four: "*Get the uptime of the bot*"
                }
            },
            ticket: {
                title: "{clientUser} | Help Panel | Ticket Page",
                value: {
                    one: "*Configure the bot*",
                    two: "*Create a Ticket*",
                    three: "*Creates a ticket with 1 click*"
                }
            },
            admin: {
                title: "{clientUser} | Help Panel | Admin Page",
                value: {
                    one: "*Blacklist System*",
                    two: "*Configure the bot language*",
                    three: "*Check whats configured in your guild*"
                }
            }
        },
        blacklist: {
            guild: {
                created: "***{guildName}** has been blacklisted from using this bot!*",
                deleted: "***{guildName}** has been removed from being blacklisted!*"
            },
            user: {
                created: "*{userName} has been blacklisted from using this bot!*",
                deleted: "*{userName} has been removed from being blacklisted!*"
            },
            error: {
                errOne: "*Provided Id must be a number!*",
                errTwo: "*Please provide a valid guild id!*",
                errThree: "*The provided guild id not saved in the database.*",
                errFour: "*The provided user id not saved in the database.*"
            }
        },
        new: {
            create: {
                channelName: "ticket",
                channelTopic: "Ticket for:",
                createTicket: "Ticket created"
            },
            button: {
                close: {
                    label: "Close",
                    style: "4"
                },
                claim: {
                    label: "Claim",
                    style: "2"
                }
            },
            embed: {
                title: "Ticket for: {userTag}",
                description: "*A staff member will be here as soon as possible,\nmean while tell us about your issue.*",
                footer: "Powered by Ticket Prime"
            },
            error: "**An error occured while creating your ticket!**",
            error1: "*Please setup a ticket config first before making a one click ticket.*\n- *If your not a admin please contact one.*"
        },
        setup: {
            transcript: {
                set: "*Ticket transcript channel has been set to {channelName}*",
                changed: "*Ticket transcript channel has been changed to {channelName}*",
                error: "*Ticket transcript channel is already set to that channel!*"
            },
            category: {
                set: "*Ticket category channel has been set to \`{categoryName}\`*",
                changed: "*Ticket category channel has been changed to \`{categoryName}\`*",
                error: "*Ticket category is already set to that category!*"
            },
            pallet: {
                description: "*Ticket embed color has been changed to \`{pallet}\`*"
            },
            dmTranscript: {
                set: "*DM-Transcript has been set to \`{toggle}\`*",
                changed: "*DM-Transcript has been changed to \`{toggle}\`*",
                error: "*Please provide a valid panelId!*"
            }
        },
        ticket: {
            premium: {
                description: "*You've reached the maximum panel creation.*\n *If you want to increase the creation limit purchase our premium plan*",
                button: {
                    label: "Purchase Here",
                    style: "5"
                }
            },
            embed: {
                openMessage: "*A staff member will be here as soon as possible,\nmean while tell us about your issue.*",
                title: "Ticket - Prime",
                description: "*If you need help or have a question click the button to open a support ticket.*\n*Any troll tickets will be punished, have that in mind!*",
                footer: "Powered by Ticket Prime",
                error: "*A ticket panel is already setup in your server!*"
            },
            button: {
                label: 'Create a Ticket',
                style: '2'
            },
            setup: {
                created: "*Setuped the Ticket System on {channel}*"
            },
            addUser: {
                added: "*Added {addUser} to the Ticket!*",
                channel_error: "*This channel is not a ticket channel!*",
                already_added: "*This user is already in this ticket!*"

            },
            revUser: {
                removed: "*Removed {revUser} from the Ticket!*",
                channel_error: "*This channel is not a ticket channel!*",
                user_doesnt_exist: "*This user is not in this ticket!*"
            } 
        },
        ticketCreate: {
            loadCreate: "*Creating your ticket...*",
            ticketTopic: "Ticket for",
            ticketTitle: "Ticket for:",
            ticketFooter: "Powered by Ticket Prime",
            button: {
                close: {
                    label: "Close Ticket",
                    emoji: "🔒",
                    style: "2"
                },
                transcript: {
                    label: "Transcript Ticket",
                    emoji: "📝",
                    style: "2"
                },
                claim: {
                    label: "Claim Ticket",
                    emoji: "📜",
                    style: "2"
                }
            },
            ticketCreated: "Ticket Created",
            ticketPremium: {
                description: "*You've reached the maximum ticket creation.*\n *If you want to increase the creation limit purchase our premium plan*",
                button: {
                    label: "Purchase Here",
                    style: "5"
                }
            },
            ticketError: "*An error occured while creating your ticket!*"
        },
        ticketClaim: {
            successClaim: "*Ticket has been successfully claimed!*",
            claimErrors: {
                one: "*Only ticket admins can claim tickets!*",
                two: "*I cannot find this ticket in the database!*",
                three: "*This ticket is already claimed by {staffClaimed}!*"
            }
        },
        ticketDelete: {
            fields: {
                one: {
                    name: "Ticket Closed",
                    value: "*Thank you for using our services!*"
                },
                two: "Ticket Owner:",
                three: "Ticket Name:",
                four: "Closed By:",
                five: " Opened On:"
            },
            footer: "Powered by Ticket Prime | Transcript",
            ticketDeletion: "*This ticket will be deleted in 5 seconds!*",
            deleteErrors: {
                one: "*I cannot find this ticket in the database!*",
                two: "*You need {support} role to manage this ticket!*"
            }
        },
        ticketTranscript: {
            successTranscript: "*Transcript has been saved to {transcriptChannel}*",
            fields: {
                one: "Ticket Owner:",
                two: "Ticket Name:",
                three: "Closed By:",
                four: " Opened On:"
            },
            footer: "Powered by Ticket Prime | Transcript",
            transcriptError: {
                one: "*I cannot find this ticket in the database!*",
                two: "*No Transcript channel is set!*"
            }
        },
        ticketAutoClose: {
            embedTitle: "⚠️ Auto Close Warning",
            embedDescription: "*This ticket channel will be deleted within **5 minutes**,\nbecause the ticket owner left the server.*",
            enableDescription: "*Successfully **enabled** the autoclose system.*",
            disableDescription: "*Successfully **disabled** the autoclose system.*"
        },
        ticketLock: {
            lockDescription: "⚠️ *This ticket channel has been locked by {userName}*",
            lockSuccessDesc: "*Successfully Locked this ticket channel.*"
        },
        ticketUnlock: {
            unlockDescription: "*This ticket channel has been unlocked by {userName}*",
            unlockSuccessDesc: "*Successfully Locked this ticket channel.*"
        },
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/