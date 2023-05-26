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

        //public override Task OnDisconnectedAsync(Exception exception)
        //{
        //    if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        //    {
        //        _connections.Remove(Context.ConnectionId);
        //        Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
        //        SendUsersConnected(userConnection.Room);
        //    }

        //    return base.OnDisconnectedAsync(exception);
        //}

        public async Task JoinRoom(UserConnection userConnection)
        {
            // Check if the room exists
            var room = await _context.Room.FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To ||  r.To == userConnection.From && r.From == userConnection.To);
            if (room is null)
            {
                // Room does not exist, create it
                room = new RoomEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    From =userConnection.From,
                    To=userConnection.To,
                    CreatedBy= userConnection.From
                };
                await _context.Room.AddAsync(room);
                await _context.SaveChangesAsync();
            }

            // Add the user to the room
    

            // Broadcast a message to all users in the room
            //await Clients.Group(userConnection.RoomId).SendAsync("User joined room");


            await Groups.AddToGroupAsync(Context.ConnectionId, room.Id);

            _connections[Context.ConnectionId] = userConnection;

            //await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection);
           
        }
        public async Task GetMessagesForUser( UserConnection userConnection)
        {
            var room = await _context.Room.FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);
            if (room is not null)
            {
              var  messages = await _context.Message
                .Where(m => m.RoomId == room.Id)
                .ToListAsync();
                // Format the messages as needed
                // Send the messages to the specific user
                await Clients.Group(room.Id).SendAsync("ReceiveMessages", userConnection.From, messages);
            }
        }
        //public async Task SendMessage(string message)
        //{
        //    if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        //    {
        //        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
        //    }
        //}

        public async Task SendUsersConnected(UserConnection userConnection)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.To);
            var room = await _context.Room.FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);

            var userName = user.FirstName + " " + user.LastName;

            await Clients.Group(room.Id).SendAsync("UsersInRoom", userName);
        }

        public async Task SendMessage( string message)
        {

            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                    {
            var room = await _context.Room.FirstOrDefaultAsync(r => r.From == userConnection.From && r.To == userConnection.To || r.To == userConnection.From && r.From == userConnection.To);
                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userConnection.From);

                var userName = user.FirstName + " " + user.LastName;

                var messagee = new MessageEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    From = userConnection.From,
                    Message = message,
                    CreatedBy = userName,
                    RoomId = room.Id
                };
                await _context.Message.AddAsync(messagee);
                await _context.SaveChangesAsync();

                await Clients.Group(room.Id).SendAsync("ReceiveMessage", userConnection.From, messagee);
                       // await Clients.Group(userConnection.RoomId).SendAsync("ReceiveMessage",message);
            }
                // Check if the room exists
            //    var room = await _context.Room.FirstOrDefaultAsync(r => r.User1 == userConnection.User1 && r.User2 == userConnection.User2);
            //if (room == null)
            //{
            //    // Room does not exist, do nothing
            //    return;
            //}

            // Broadcast a message to all users in the room
           // await Clients.Group(roomId).SendAsync(message);
        }



    }
}
