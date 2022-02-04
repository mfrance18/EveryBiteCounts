using EveryBiteCounts.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveryBiteCounts.Repositories
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(IConfiguration config) : base(config) { }

        public List<Message> GetMessagesByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id as MessageId, m.MessageContent, m.SenderId, m.ReceiverId, up.FirstName, up.LastName
                                        FROM Message m
                                        Left join UserProfile up on up.Id = m.SenderId
                                        WHERE m.ReceiverId = @userId";

                    cmd.Parameters.AddWithValue("@userId", id);

                    var messages = new List<Message>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        messages.Add(new Message()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("MessageId")),
                            MessageContent = reader.GetString(reader.GetOrdinal("MessageContent")),
                            SenderId = reader.GetInt32(reader.GetOrdinal("SenderId")),
                            ReceiverId = reader.GetInt32(reader.GetOrdinal("ReceiverId")),
                            UserProfile = new UserProfile()
                            {
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName"))
                            }
                        });
                    }

                    reader.Close();

                    return messages;
                }
            }
        }

        public void AddMessage(Message message)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Message (MessageContent, SenderId, ReceiverId)
                                        OUTPUT INSERTED.ID
                                        VALUES(@MessageContent, @SenderId, @ReceiverId)";

                    cmd.Parameters.AddWithValue("@MessageContent", message.MessageContent);
                    cmd.Parameters.AddWithValue("@SenderId", message.SenderId);
                    cmd.Parameters.AddWithValue("@ReceiverId", message.ReceiverId);

                    message.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteMessage(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE
                                        FROM Message
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void EditMessage(Message message)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Message
                                        SET
                                            MessageContent = @messageContent
                                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@messageContent", message.MessageContent);
                    cmd.Parameters.AddWithValue("@id", message.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
