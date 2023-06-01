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


        public async Task JoinRoom(UserConnection userConnection)
        {
            // Check if the room exists
            var room = await _context.Rooms
                .FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To ||  r.To == userConnection.From && r.From == userConnection.To);


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
                    From =userConnection.From,
                    To=userConnection.To,
                    CreatedBy= userConnection.From,
                    FromName= frname,
                    ToName= toname,
                    FromRole = FromIdRole.Name,
                    ToRole= ToIdRole.Name
                };
                await _context.Rooms.AddAsync(room);
            }

            else if(room.DeletedFromFirstUser == userConnection.From )
            {
                room.DeletedFromFirstUser = null;
                room.DeletedFromSecondUser = null;
                _context.Rooms.Update(room);
            }
            else if (room.DeletedFromSecondUser == userConnection.From )
            {
                room.DeletedFromSecondUser = null;
                room.DeletedFromFirstUser = null;
                _context.Rooms.Update(room);
            }
            await _context.SaveChangesAsync();

            // Add user to the room

            await Groups.AddToGroupAsync(Context.ConnectionId, room.Id);

            _connections[Context.ConnectionId] = userConnection;
     
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


        public async Task SendMessage( string message)
        {

            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                    {
            var room = await _context.Rooms
                    .FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.From);

                var userName = user.FirstName + " " + user.LastName;

                var messagee = new MessageEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    From = userConnection.From,
                    Message = message,
                    CreatedBy = userName,
                    RoomId = room.Id,
                };
                room.LastMessage = messagee.Message;
                room.CreatedOnLastMessage= DateTimeOffset.Now;
                await _context.Messages.AddAsync(messagee);
                await _context.SaveChangesAsync();

                await Clients.Group(room.Id).SendAsync("ReceiveMessage", room.Id, messagee);
            }
               
        }



    }
}
