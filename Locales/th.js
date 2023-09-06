/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/

module.exports = {
    bot: {
        vote: {
            content: "*คำสั่งนี้จะถูกนำไปใช้กับระบบในไม่ช้า!*"
        },
        ping: {
            title: "คืนค่า Latency และ API Ping!",
            fields1: "เวลาในการตอบสนองของ Websocket:",
            fields2: "เวลาแฝงของ API:",
            footer: "ขับเคลื่อนโดย Ticket Prime",
            green: "🟢 เร็ว",
            yellow: "🟡 ช้า",
            red: "🔴 ช้าลง",
        },
        language: {
            lang_title: "ระบบภาษา",
            lang_description: "*เปลี่ยนภาษาเริ่มต้นเรียบร้อยแล้ว*",
            lang_from: "ภาษาเก่า:",
            lang_to: "ภาษาใหม่:",
            lang_error: "*เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง*",
            lang_footer: "ขับเคลื่อนโดย Ticket Prime"
        },
        uptime: {
            title: "เวลาทำงานของ: {clientUser}",
            fields1: "*ตั้งแต่:*",
            fields2: "*เปิดตัวเมื่อ:*",
            footer: "ขับเคลื่อนโดย Ticket Prime",
        },
        invite: {
            description: "*ขอขอบคุณที่เลือก **{clientUser}** เป็นบอท {clientAbout} ของคุณ คุณสามารถเชิญฉันได้โดยคลิกปุ่มเชิญด้านล่าง*",
            footer: "เชิญ {client}",
            button: {
                label: "เชิญฉัน",
                style: "5"
            }
        },
        help: {
            overviewTitle: "{clientUser} | แผงช่วยเหลือ | หน้าภาพรวม",
            overviewFieldsTitle: {
                one: "คุณสมบัติบอท:",
                two: "สถิติบอท:",
                three: "ผู้พัฒนา:"
            },
            overviewFieldsValue: {
                one: ">>> ***{clientMention}** {clientDescription}*",
                two: ">>> <:omega_guild:1072826074666377306> **Guilds:** \` {clientGuild} \`\n<:omega_stats:1072825816536317992> **Bot Ping:** \`{clientPing}ms\`\n<:omega_slash:1072826070069428234> **slashC:** \` {clientSlash} \`",
                three: "> *บอทที่น่าทึ่งนี้เขียนโค้ดโดย [Nacht](https://devbenz.me) พร้อมคุณสมบัติมากมายที่พร้อมใช้งานและอีกมากมายในเร็วๆ นี้!*"
            },
            overviewFooter: "ใช้เมนูเพื่อดูคำสั่งทั้งหมดของฉัน!",
            overviewPageFooter: {
                one: "หน้าที่ 1 • 3",
                two: "หน้าที่ 2 • 3",
                three: "หน้าที่ 3 • 3"
            },
            info: {
                title: "{clientUser} | แผงช่วยเหลือ | หน้าข้อมูล",
                value: {
                    one: "*รับข้อมูลเกี่ยวกับคำสั่งทั้งหมด*",
                    two: "*เชิญบอทไปที่เซิร์ฟเวอร์ของคุณ*",
                    three: "*รับเวลาตอบสนองของบอท*",
                    four: "*รับเวลาทำงานของบอท*"
                }
            },
            ticket: {
                title: "{clientUser} | แผงช่วยเหลือ | หน้าตั๋ว",
                value: {
                    one: "*กำหนดค่าบอท*",
                    two: "*สร้างตั๋ว*",
                    three: "*สร้างตั๋วได้ใน 1 คลิก*"
                }
            },
            admin: {
                title: "{clientUser} | แผงช่วยเหลือ | แอดมินเพจ",
                value: {
                    one: "*ระบบบัญชีดำ*",
                    two: "*กำหนดค่าภาษาบอท*",
                }
            }
        },
        blacklist: {
            guild: {
                created: "***{guildName}** ถูกขึ้นบัญชีดำจากการใช้บอทนี้!*",
                deleted: "***{guildName}** ถูกลบออกจากบัญชีดำแล้ว!*"
            },
            user: {
                created: "*{userName} ถูกขึ้นบัญชีดำจากการใช้บอทนี้!*",
                deleted: "*{userName} ถูกลบออกจากบัญชีดำแล้ว!*"
            },
            error: {
                errOne: "*รหัสที่ระบุต้องเป็นตัวเลข!*",
                errTwo: "*โปรดระบุรหัสกิลด์ที่ถูกต้อง!*",
                errThree: "*รหัสกิลด์ที่ให้ไว้ไม่ได้บันทึกในฐานข้อมูล*",
                errFour: "*รหัสผู้ใช้ที่ระบุไม่ได้บันทึกในฐานข้อมูล*"
            }
        },
        new: {
            create: {
                channelName: "ตั๋ว",
                channelTopic: "ตั๋วสำหรับ:",
                createTicket: "ปิดการขายตั๋ว"
            },
            button: {
                close: {
                    label: "ปิด",
                    style: "4"
                },
                claim: {
                    label: "เรียกร้อง",
                    style: "2"
                }
            },
            embed: {
                title: "ตั๋วสำหรับ: {userTag}",
                description: "*เจ้าหน้าที่จะมาที่นี่โดยเร็วที่สุด\nหมายความว่าในขณะที่แจ้งปัญหาของคุณให้เราทราบ*",
                footer: "ขับเคลื่อนโดย Ticket Prime"
            },
            error: "**เกิดข้อผิดพลาดขณะสร้างตั๋วของคุณ!**",
            error1: "*โปรดตั้งค่าการกำหนดค่าตั๋วก่อนสร้างตั๋วคลิกเดียว*\n- *หากคุณไม่ใช่ผู้ดูแลระบบ โปรดติดต่อ*"
        },
        setup: {
            transcript: {
                set: "*ตั้งค่าช่องทางการถอดตั๋วเป็น {channelName}*",
                changed: "*ช่องทางการถอดตั๋วเปลี่ยนเป็น {channelName}*",
                error: "*ช่องการถอดตั๋วถูกกำหนดเป็นช่องนั้นแล้ว!*"
            },
            category: {
                set: "*ตั้งค่าช่องหมวดหมู่ตั๋วเป็น \`{categoryName}\`*",
                changed: "*เปลี่ยนช่องหมวดหมู่ตั๋วเป็น \`{categoryName}\`*",
                error: "*หมวดหมู่ตั๋วถูกกำหนดเป็นหมวดหมู่นั้นแล้ว!*"
            },
            pallet: {
                description: "*สีที่ฝังตั๋วเปลี่ยนเป็น \`{pallet}\`*"
            },
            dmTranscript: {
                set: "*DM-Transcript ถูกตั้งค่าเป็น \`{toggle}\`*",
                changed: "*DM-Transcript ถูกเปลี่ยนเป็น \`{toggle}\`*",
                error: "*โปรดระบุรหัสแผงที่ถูกต้อง!*"
            }
        },
        ticket: {
            premium: {
                description: "*คุณได้สร้างแผงข้อมูลถึงขีดจำกัดสูงสุดแล้ว*\n *หากคุณต้องการเพิ่มขีดจำกัดการสร้าง ให้ซื้อแผนพรีเมียมของเรา*",
                button: {
                    label: "ซื้อที่นี่",
                    style: "5"
                }
            },
            embed: {
                openMessage: "*เจ้าหน้าที่จะมาที่นี่โดยเร็วที่สุด\nหมายความว่าในขณะที่แจ้งปัญหาของคุณให้เราทราบ*",
                title: "ตั๋ว - นายกรัฐมนตรี",
                description: "*หากคุณต้องการความช่วยเหลือหรือมีคำถาม คลิกปุ่มเพื่อเปิดตั๋วสนับสนุน*\n*ตั๋วโทรลล์ใดๆ ก็ตามจะถูกลงโทษ โปรดจำไว้!*",
                footer: "ขับเคลื่อนโดย Ticket Prime",
                error: "*แผงขายตั๋วได้รับการติดตั้งแล้วในเซิร์ฟเวอร์ของคุณ!*"
            },
            button: {
                label: 'สร้างตั๋ว',
                style: '2'
            },
            setup: {
                created: "*ตั้งค่าระบบตั๋วใน {channel}*"
            },
            addUser: {
                added: "*เพิ่ม {addUser} ลงในตั๋วแล้ว!*",
                channel_error: "*ช่องนี้ไม่ใช่ช่องขายตั๋ว!*",
                already_added: "*ผู้ใช้รายนี้อยู่ในตั๋วนี้แล้ว!*"

            },
            revUser: {
                removed: "*ลบ {revUser} ออกจาก Ticket!*",
                channel_error: "*ช่องนี้ไม่ใช่ช่องขายตั๋ว!*",
                user_doesnt_exist: "*ผู้ใช้นี้ไม่อยู่ในตั๋วนี้!*"
            } 
        },
        ticketCreate: {
            loadCreate: "*กำลังสร้างตั๋วของคุณ...*",
            ticketTopic: "ตั๋วสำหรับ",
            ticketTitle: "ตั๋วสำหรับ:",
            ticketFooter: "ขับเคลื่อนโดย Ticket Prime",
            button: {
                close: {
                    label: "ปิดตั๋ว",
                    emoji: "🔒",
                    style: "2"
                },
                transcript: {
                    label: "ตั๋วถอดเสียง",
                    emoji: "📝",
                    style: "2"
                },
                claim: {
                    label: "ขอรับตั๋ว",
                    emoji: "📜",
                    style: "2"
                }
            },
            ticketCreated: "สร้างตั๋วแล้ว",
            ticketPremium: {
                description: "*คุณสร้างตั๋วครบจำนวนสูงสุดแล้ว*\n *หากคุณต้องการเพิ่มขีดจำกัดการสร้าง ให้ซื้อแผนพรีเมียมของเรา*",
                button: {
                    label: "ซื้อที่นี่",
                    style: "5"
                }
            },
            ticketError: "*เกิดข้อผิดพลาดขณะสร้างตั๋วของคุณ!*"
        },
        ticketClaim: {
            successClaim: "*รับตั๋วสำเร็จแล้ว!*",
            claimErrors: {
                one: "*ผู้ดูแลตั๋วเท่านั้นที่สามารถรับตั๋วได้!*",
                two: "*ฉันไม่พบตั๋วนี้ในฐานข้อมูล!*",
                three: "*{staffClaimed} อ้างสิทธิ์ตั๋วนี้แล้ว!*"
            }
        },
        ticketDelete: {
            fields: {
                one: {
                    name: "ปิดการขายตั๋ว",
                    value: "*ขอบคุณที่ใช้บริการของเรา!*"
                },
                two: "เจ้าของตั๋ว:",
                three: "ชื่อตั๋ว:",
                four: "ปิดโดย:",
                five: " เปิดเมื่อ:"
            },
            footer: "ขับเคลื่อนโดย Ticket Prime | Transcript",
            ticketDeletion: "*ตั๋วนี้จะถูกลบใน 5 วินาที!*",
            deleteErrors: {
                one: "*ฉันไม่พบตั๋วนี้ในฐานข้อมูล!*",
                two: "*คุณต้องมีบทบาท {support} เพื่อจัดการตั๋วนี้!*"
            }
        },
        ticketTranscript: {
            successTranscript: "*บันทึกการถอดเสียงไปที่ {transcriptChannel} แล้ว*",
            fields: {
                one: "เจ้าของตั๋ว:",
                two: "ชื่อตั๋ว:",
                three: "ปิดโดย:",
                four: " เปิดเมื่อ:"
            },
            footer: "ขับเคลื่อนโดย Ticket Prime | Transcript",
            transcriptError: {
                one: "*ฉันไม่พบตั๋วนี้ในฐานข้อมูล!*",
                two: "*ไม่มีการตั้งค่าช่อง Transcript!*"
            }
        },
        ticketAutoClose: {
            embedTitle: "⚠️ คำเตือนปิดอัตโนมัติ",
            embedDescription: "*ช่องตั๋วนี้จะถูกลบภายใน **5 นาที**,\nเนื่องจากเจ้าของตั๋วออกจากเซิร์ฟเวอร์*",
            enableDescription: "***เปิดใช้งาน** ระบบปิดอัตโนมัติสำเร็จแล้ว*",
            disableDescription: "*สำเร็จ **ปิดการใช้งาน** ระบบปิดอัตโนมัติ*"
        },
        ticketLock: {
            lockDescription: "⚠️ *ช่องตั๋วนี้ถูกล็อคโดย {userName}*",
            lockSuccessDesc: "*ล็อกช่องตั๋วนี้เรียบร้อยแล้ว*"
        },
        ticketUnlock: {
            unlockDescription: "*ช่องตั๋วนี้ถูกปลดล็อกโดย {userName}*",
            unlockSuccessDesc: "*ล็อกช่องตั๋วนี้เรียบร้อยแล้ว*"
        }
    }
}

/**
 * @Product : Ticket Prime
 * @Author : Nacht#2366
 * @License : MIT
 * Sharing files is prohibited, if so legal actions will be placed against you!
*/