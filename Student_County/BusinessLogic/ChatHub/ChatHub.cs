using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.DAL;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using static MailKit.Net.Imap.ImapEvent;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Student_County.BusinessLogic.Hubs
{
    //[Authorize]
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;




        public ChatHub(IDictionary<string, UserConnection> connections, StudentCountyContext context, UserManager<ApplicationUser> userManager)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
            _context = context;
            _userManager = userManager;


        }




        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);

            }

            return base.OnDisconnectedAsync(exception);
        }


        public async Task JoinRoom(UserConnection userConnection)
        {
            if (userConnection.From != userConnection.To)
            {
                // Check if the room exists
                var room = await _context.Rooms
                    .FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);


                if (room is null)
                {
                    var userFrom = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.From);
                    var frname = userFrom.FirstName + " " + userFrom.LastName;
                    var userTo = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.To);
                    var toname = userTo.FirstName + " " + userTo.LastName;
                    var userFromRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.UserId == userConnection.From);
                    var FromIdRole = await _context.Roles.FirstOrDefaultAsync(x => x.Id == userFromRole.RoleId);
                    var userToRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.UserId == userConnection.To);
                    var ToIdRole = await _context.Roles.FirstOrDefaultAsync(x => x.Id == userToRole.RoleId);


                    // Room does not exist, create it
                    room = new RoomEntity
                    {
                        Id = Guid.NewGuid().ToString(),
                        From = userConnection.From,
                        To = userConnection.To,
                        CreatedBy = userConnection.From,
                        FromName = frname,
                        ToName = toname,
                        FromRole = FromIdRole.Name,
                        ToRole = ToIdRole.Name
                    };
                    await _context.Rooms.AddAsync(room);
                }

                else if (room.DeletedFromFirstUser == userConnection.From)
                {
                    room.DeletedFromFirstUser = null;
                    room.DeletedFromSecondUser = null;
                    _context.Rooms.Update(room);
                }
                else if (room.DeletedFromSecondUser == userConnection.From)
                {
                    room.DeletedFromSecondUser = null;
                    room.DeletedFromFirstUser = null;
                    _context.Rooms.Update(room);
                }
                await _context.SaveChangesAsync();

                // Add user to the room

                await Groups.AddToGroupAsync(Context.ConnectionId, room.Id);
                // Add the UserConnection to the dictionary
                _connections[Context.ConnectionId] = userConnection;
            }
           

        }


        public async Task GetMessagesForUser( UserConnection userConnection)
        {
            var room = await _context.Rooms
                .FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);
            if (room is not null)
            {
              var  messages = await _context.Messages
                .Where(m => m.RoomId == room.Id)
                .ToListAsync();
                // Format the messages as needed
                // Send the messages to the specific user
                await Clients.Group(room.Id).SendAsync("ReceiveMessages", userConnection.From, messages);
            }
        }


        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                var room = await _context.Rooms
                    .FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To ||
                    r.To == userConnection.From && r.From == userConnection.To);
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.From);

                var userName = user.FirstName + " " + user.LastName;

                var messageEntity = new MessageEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    From = userConnection.From,
                    Message = message,
                    CreatedBy = userName,
                    RoomId = room.Id,
                    IsRead = false,
                };
                room.LastMessage = messageEntity.Message;
                room.CreatedOnLastMessage = DateTimeOffset.Now;
                await _context.Messages.AddAsync(messageEntity);
                await _context.SaveChangesAsync();

                var to = userConnection.From == room.From ? room.From : room.To;

                await Clients.Group(room.Id).SendAsync("ReceiveMessage", room.Id, messageEntity);

                // Check if the message is unread by the sender
                //if (!messageEntity.IsRead)
                //{
                //    // Get the number of unread messages for the receiver
                //    int unreadCount = GetUnreadMessageCount(to);

                //    // Send a notification to the receiver
                //    await Clients.User(to).SendAsync("ReceiveNotification", $"You have {unreadCount} new messages");
                //}

                // Update the IsRead property on the sender's messages
                //var senderMessages = _context.Messages
                //    .Where(m => m.RoomId == room.Id && m.From == userConnection.From && !m.IsRead)
                //    .ToList();

                //foreach (var senderMessage in senderMessages)
                //{
                //    senderMessage.IsRead = true;
                //}

                await _context.SaveChangesAsync();
            }
        }

        //public int GetUnreadMessageCount(string to)
        //{
        //    // Get all the messages for the receiver
        //    var messages = _context.Messages
        //        .Where(m => (m.From == to ) && !m.IsRead)
        //        .ToList();

        //    // Return the number of unread messages
        //    return messages.Count;
        //}







    }
}
